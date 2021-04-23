module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('Subscribes', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID
      },
      question_id: {
        type: Sequelize.UUID
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
    await queryInterface.dropTable('Subscribes');
  }
};