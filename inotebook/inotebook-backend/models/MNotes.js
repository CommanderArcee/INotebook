const { DataTypes } = require("sequelize");

const model = (sequelize) => {
    const attributes = {
        NotesId : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        Title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Description : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Date : {
            type : DataTypes.DATE
        },
        user_id : {
            type : DataTypes.INTEGER,
            references: {
                model: 'Users', // Target model name (replace with your actual model)
                key: 'UserId' // Target model's primary key column (replace if different)
              }
        } 
    }
    const options = {
        freezeTableName: true,
        // Here freezetableName means it will create tbl in database which we given not itself.
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false
    };

    const Notes = sequelize.define("Notes", attributes, options);
    return Notes;
}  

module.exports = model;