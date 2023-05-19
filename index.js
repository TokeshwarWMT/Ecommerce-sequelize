import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    sequelize
      .sync({ force: false })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    app.listen(process.env.PORT);
    console.log(`Server on port ${process.env.PORT} 🚀🚀🚀`);
  } catch (error) {
    console.log(error);
  }
}

main();
