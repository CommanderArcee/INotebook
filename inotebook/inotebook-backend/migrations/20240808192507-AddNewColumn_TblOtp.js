'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('TblOtp', 'IsValidOtp', {
      type: Sequelize.TINYINT,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('TblOtp', 'IsValidOtp');
  }
};
