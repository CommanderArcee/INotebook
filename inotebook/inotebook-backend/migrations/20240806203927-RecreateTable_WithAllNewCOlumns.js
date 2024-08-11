'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TblOtp', {
      OtpId: {
        type: Sequelize.BIGINT,
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
        type: Sequelize.TINYINT,
        allowNull: false
      },
      VerifiedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      ExpiredDateTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      OtpExpiredTimeLimit: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      IsActive: {
        type: Sequelize.TINYINT,
        allowNull: false
      },
      // Add createdAt and updatedAt columns
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TblOtp');
  }
};
