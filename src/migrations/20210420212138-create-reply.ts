module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('Replies', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      ans_by: {
        type: Sequelize.UUID
      },
      question_id: {
        type: Sequelize.UUID
      },
      ans_body: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Replies');
  }
};