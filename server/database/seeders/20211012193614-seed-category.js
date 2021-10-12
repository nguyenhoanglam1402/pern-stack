'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "CourseCategories",
      [
        {
          name: "Marketing",
          description: "Our courses can help you to have many knowledges and experiences negotiation's skils, marketing skills, and so on, that will be the preconditions for your careers in the future. We are willing to help you update your skills",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HR",
          description: "Our courses can help you to have many knowledges and experiences about human resource major, that will be the preconditions for your careers in the future. We are willing to help you update your skills",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "IT",
          description: "Our courses can help you to have many knowledges and experiences about information technology major, that will be the preconditions for your careers in the future. We are willing to help you update your skills about coding",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Design",
          description: "Our courses can help you to have many knowledges and experiences about photoshop, design, create many masterpiece about arts, that will be the preconditions for your careers in the future. We are willing to help you update your skill",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Logistics",
          description: "Our courses can help you to have many knowledges and experiences negotiation's skils, marketing skills, and so on, that will be the preconditions for your careers in the future. We are willing to help you update your skills",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
