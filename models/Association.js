import { User } from "./User.js";
import Cart from "./Cart.js";
import Product from "./Product.js";

Cart.belongsTo(User, { foreignKey: "userId" });
Cart.belongsToMany(Product, { through: "cart_product", foreignKey: "cartId" });
Product.belongsToMany(Cart, { through: "cart_product", foreignKey: "productId" });
