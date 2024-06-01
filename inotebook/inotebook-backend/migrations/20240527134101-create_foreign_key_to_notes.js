'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('notes', 'user_id',{
        type: Sequelize.DataTypes.INTEGER,
        references: { 
          model: 'Users', // Reference table name
          key: 'UserId', // Primary key column in the reference table
        },
        // meaning end of code and it are optional but we add because we create foreign key.
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE' 
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('notes', 'user_id');
  }
};

/*
This are optional 
'CASCADE'" (default for non-nullable foreign keys in Sequelize): When a row is deleted from the parent table, all child rows referencing that parent row are also deleted.
 This ensures data consistency and prevents orphaned data in the child table.
Ex of CASCADE ->  it means that if you delete the book entry from the parent table, all the reviews related to that book will also be automatically deleted from the child 
table.

'SET NULL'": When a row is deleted from the parent table, the foreign key column in the child table is set to NULL. This can be useful if you want to keep child rows but 
indicate their orphaned state.

'RESTRICT'": The deletion operation on the parent table is prevented if there are child rows referencing it. This enforces strict data integrity and prevents accidental 
deletion of parent rows that have associated child data.

'NO ACTION'": No action is taken on the child table. This option allows deletion in the parent table regardless of child references, but it might lead to inconsistencies 
if child rows rely on the parent data.
*/
