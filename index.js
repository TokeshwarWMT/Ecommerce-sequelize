import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  await sequelize.sync({ force: false });
  app.listen(process.env.PORT);
  console.log(`Server on port ${process.env.PORT} 🚀🚀🚀`);
}

main();
