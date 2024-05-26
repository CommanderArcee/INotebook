/* Sql server */
const { DataTypes } = require("sequelize");

// By this type we create data types of a model like below.
function model(sequelize) {
    const attributes = {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
    },
    Name: { type: DataTypes.STRING(30), allowNull: false },
    Email: { type: DataTypes.STRING(100), allowNull: false },
    Password : { type: DataTypes.STRING(100), allowNull: false },
    Date : {type : DataTypes.DATE}
};

const options = {
    freezeTableName: true,
    // Here freezetableName means it will create tbl in database which we given not itself.
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    indexes : [
        {
            fields : ["Email"],
            unique : true
        }
    ]
};

return sequelize.define("Users", attributes, options);
// In option we create timestampls, indexex, trigger what we do with table everything we define inside the options and sequelize created when engine/nodejs will run.
// Now we don't run migration.

}

module.exports = model;
