'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log("Starting migration up");
    try{
      await queryInterface.changeColumn('TblOtp', 'OtpId', {
        type: Sequelize.BIGINT,
        allowNull: false,
      });
      await queryInterface.changeColumn('TblOtp', 'ExpiredDateTime', {
        type: Sequelize.DATE,
        allowNull: false,
      });
      await queryInterface.changeColumn('TblOtp', 'VerifiedAt', {
        type: Sequelize.DATE,
        allowNull: false,
      });
      await queryInterface.changeColumn('TblOtp', 'Verify', {
        type: Sequelize.TINYINT,
        allowNull: false,
      });
    }
    catch(err){
      console.log(err.message);
    }
    console.log("Migration up completed");
  },

  async down (queryInterface, Sequelize) {
    console.log("Starting migration down");
    await queryInterface.changeColumn('TblOtp', 'OtpId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn('TblOtp', 'ExpiredDateTime', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('TblOtp', 'VerifiedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('TblOtp', 'Verify', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    console.log("Migration down completed");
  }
};
