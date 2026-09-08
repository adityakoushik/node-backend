'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    /**
     * queryInterface is a database schema manupulation tool provided by Sequelize. 
     * It allows you to create, modify, and delete database tables and columns.
     * Sequelize is an ORM (Object-Relational Mapping) library for Node.js
     * By Using Sequelize we can define the datatype of each column in the table.
     */
    await queryInterface.createTable('users', {
      id:{
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email:{
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      password_hash:{
        type: Sequelize.STRING(255),
        allowNull: false
      },
      role:{
        type: Sequelize.ENUM('ADMIN', 'STAFF', 'CUSTOMER'),
        allowNull: false,
        defaultValue: 'CUSTOMER'
      },
      status:{
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    })
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('users');
  }
};
