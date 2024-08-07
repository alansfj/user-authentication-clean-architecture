import { bcrypt } from "../../adapters/bcrypt";
import { envs } from "../../adapters/envs";
import { JWT } from "../../adapters/jwt";
import { LoginUserDto } from "../../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { ValidateUserDto } from "../../domain/dtos/validate-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom-error";
import { AuthRepositoryInterface } from "../../domain/repositories/auth.repository.interface";
import { EmailService } from "../../domain/services/email.service";
import { prisma } from "../database/prisma-client";

export class AuthRepository implements AuthRepositoryInterface {
  constructor(private readonly emailService: EmailService) {}

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user)
        throw CustomError.notFound(`user with email ${email} not found`);

      return UserEntity.fromObjectWithoutPassword(user);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) throw CustomError.notFound(`user with id ${id} not found`);

      return UserEntity.fromObjectWithoutPassword(user);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async registeUser(
    dto: RegisterUserDto
  ): Promise<{ user: UserEntity; token: string }> {
    try {
      const { email, password, name } = dto;

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (user)
        throw CustomError.badRequest(`user with email ${email} already exists`);

      const hashedPassword = bcrypt.hashPassword(password);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      const token = await JWT.generateToken({
        id: newUser.id,
        email: newUser.email,
      });

      if (!token) throw CustomError.internalServer("error creating jwt");

      this.sendValidateUserEmail(newUser.email, token);

      return { user: UserEntity.fromObjectWithoutPassword(newUser), token };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async loginUser(
    dto: LoginUserDto
  ): Promise<{ user: UserEntity; token: string }> {
    try {
      const { email, password } = dto;

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) throw CustomError.notFound(`user email or password wrong`);

      const isCorrectPassword = bcrypt.comparePasswords(
        password,
        user.password
      );

      if (!isCorrectPassword)
        throw CustomError.badRequest(`user email or password wrong`);

      const token = await JWT.generateToken({ id: user.id, email: user.email });

      if (!token) throw CustomError.internalServer("error creating jwt");

      return { user: UserEntity.fromObjectWithoutPassword(user), token };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async validateUser(dto: ValidateUserDto): Promise<UserEntity> {
    try {
      const { token } = dto;

      const payload = await JWT.validateToken(token);

      if (!payload) throw CustomError.badRequest("invalid token");

      const { email } = payload as { email: string };

      if (!email) throw CustomError.badRequest("email not in token");

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) throw CustomError.badRequest("user not exist");

      const updatedUser = await prisma.user.update({
        data: { isValidated: true },
        where: {
          email: user.email,
        },
      });

      return UserEntity.fromObjectWithoutPassword(updatedUser);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): CustomError {
    if (error instanceof CustomError) {
      return error;
    } else if (error instanceof Error) {
      return CustomError.internalServer(error.message);
    } else {
      return CustomError.unknow();
    }
  }

  private async sendValidateUserEmail(email: string, token: string) {
    if (!token) throw CustomError.internalServer("error creating jwt");

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

    const htmlBody = `
  
    <h1>Validate your email</h1>
    <p>Click on the following link to validate your account.</p>
    <a href="${link}">Validate</a>
    
    `;

    const isSent = await this.emailService.sendEmail({
      to: email,
      subject: "Validate your email",
      htmlBody,
    });

    if (!isSent) throw CustomError.internalServer("error sending email");

    return true;
  }
}
