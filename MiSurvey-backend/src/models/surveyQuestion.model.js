const { DataTypes } = require('sequelize');
const db = require('../config/database'); // Make sure this path points to your database configuration
const SurveyPage = require('./surveyPage.model');
const SurveyType = require('./surveyType.model');

const SurveyQuestion = db.sequelize.define('SurveyQuestion', {
    QuestionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    PageID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SurveyPage,
            key: 'PageID'
        }
    },
    QuestionText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    QuestionType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SurveyType,
            key: 'SurveyTypeID'
        }
    },
    QuestionOrder: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'SurveyQuestions',
    timestamps: false, 
});

module.exports = SurveyQuestion;