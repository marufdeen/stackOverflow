module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING
      },
      ques_body: {
        type: Sequelize.TEXT
      },
      viewed: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Questions');
  }
};