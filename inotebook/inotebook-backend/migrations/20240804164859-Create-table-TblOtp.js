'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TblOtp', {
      OtpId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Otp: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Verify: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      VerifiedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TblOtp');
  }
};
