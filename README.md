
Setup development:

1. ejecutar el comando npm i
2. copia el contenido del archivo .env.template y pegar su contenido en un nuevo archivo llamado .env
3. inicia docker y ejecutar el comando docker compose up -d
4. ejecutar el comando npx prisma migrate dev --name init
5. ejecutar el comando npm run dev