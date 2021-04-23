const { VOTE_TYPE } = require('../constants/constants');

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('Votes', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      vote_by: {
        type: Sequelize.UUID
      },
      reply_id: {
        type: Sequelize.UUID
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface: any) => {
    await queryInterface.dropTable('Votes');
  }
};