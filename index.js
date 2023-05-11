import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  await sequelize.sync({ force: false });
  app.listen(5000);
  console.log("Server on port 5000 🚀🚀🚀");
}

main();
