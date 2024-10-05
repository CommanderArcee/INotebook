'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the Users table
    await queryInterface.createTable('Users', {
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      Name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      Password: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      Date: {
        type: Sequelize.DATE
      }
    });

    // Add index after the table creation
    await queryInterface.addIndex('Users', ['Email'], {
      name: 'users_email_unique_index', // Optional: name of the index
      unique: true, // To ensure the index is unique
    });

    // Add another index if needed
    await queryInterface.addIndex('Users', ['Name'], {
      name: 'users_name_index',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove indexes before dropping the table
    await queryInterface.removeIndex('Users', 'users_email_unique_index');
    await queryInterface.removeIndex('Users', 'users_name_index');

    // Drop the Users table
    await queryInterface.dropTable('Users');
  }
};
