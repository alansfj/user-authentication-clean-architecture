import { Server } from "./infrastructure/http/server";

(async () => {
  main();
})();

function main() {
  Server.start();
}
