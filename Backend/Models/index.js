// model/index.js
const dbConfig = require("../Config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.books = require("./bookModel")(sequelize, DataTypes);
db.rents =require("./rentModel")(sequelize, DataTypes);

 //relationship between two tables
 db.users.hasMany(db.rents)
 db.rents.belongsTo(db.users)

 db.books.hasMany(db.rents)
 db.rents.belongsTo(db.books)


// Sync and seed admin
db.sequelize.sync({ force: false }).then(async () => {
  console.log("yes re-sync done");

  const seedAdmin = require("../Services/SeedAdmin");
  await seedAdmin();
});

module.exports = db;