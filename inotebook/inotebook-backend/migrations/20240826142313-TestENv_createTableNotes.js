'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notes', {
      NotesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      Title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Date: {
        type: Sequelize.DATE
      },
      // By this way we add foreign key no need to use migration.
      // This is the syntax to add foreign key in any table.
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Target model name (replace with your actual model)
          key: 'UserId' // Target model's primary key column (replace if different)
        }
      },
      NoteTag: {
        type: Sequelize.STRING,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notes');
  }
};
