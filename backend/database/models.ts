
import dotenv from "dotenv";
import { DataTypes, Sequelize } from "sequelize";

dotenv.config();

const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;

if (!MYSQL_HOST || !MYSQL_DATABASE || !MYSQL_USER || !MYSQL_PASSWORD) {
  throw new Error("Databse connection details missing");
}

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: "mysql",
});

const Magazine = sequelize.define("Magazine", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  publicationDate: {
    type: DataTypes.DATE,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.CHAR(64),
    allowNull: false,
  },
});

const Subscription = sequelize.define("Subscription", {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

User.hasMany(Subscription);
Subscription.belongsTo(User);
Magazine.hasMany(Subscription);
Subscription.belongsTo(Magazine);

sequelize
  .sync()
  .then(() => {
    console.log("Database and tables are in sync.");
  })
  .catch((error) => {
    console.error("Error syncing the database:", error);
  });

export { sequelize, Magazine, User, Subscription };
