'use strict';

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('teams', {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        teamname: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'team_name'
        },
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      return queryInterface.dropTable('teams');
    }
  };
