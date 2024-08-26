const { DataTypes } = require("sequelize");

const model = (sequelize) => {
    const attributes = {
        OtpId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Otp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Verify: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        VerifiedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ExpiredDateTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        OtpExpiredTimeLimit: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        IsActive: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        IsValidOtp : {
            type: DataTypes.TINYINT,
            allowNull: true,
        }
    }

    const options = {
        freezeTableName: true,
        // Here freezetableName means it will create tbl in database which we given not itself.
        // Enable timestamps
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }

    const mOtp = sequelize.define("TblOtp", attributes, options);
    return mOtp;
};


module.exports = model;