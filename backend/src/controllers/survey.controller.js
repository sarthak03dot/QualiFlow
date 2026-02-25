"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitResponse = exports.getSurveysAnalytics = exports.deleteSurvey = exports.updateSurvey = exports.createSurvey = exports.getSurveyById = exports.getSurveys = void 0;
const survey_model_1 = __importDefault(require("../models/survey.model"));
const response_model_1 = __importDefault(require("../models/response.model"));
const zod_1 = require("zod");
const surveySchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'Title must be at least 3 characters'),
    description: zod_1.z.string().optional(),
    nodes: zod_1.z.array(zod_1.z.record(zod_1.z.string(), zod_1.z.unknown())).optional(),
    edges: zod_1.z.array(zod_1.z.record(zod_1.z.string(), zod_1.z.unknown())).optional(),
    status: zod_1.z.enum(['draft', 'published']).optional(),
});
const updateSurveySchema = surveySchema.partial();
const getSurveys = async (req, res, next) => {
    try {
        const surveys = await survey_model_1.default.find({ user: req.user._id });
        res.json(surveys);
    }
    catch (error) {
        next(error);
    }
};
exports.getSurveys = getSurveys;
const getSurveyById = async (req, res, next) => {
    try {
        const survey = await survey_model_1.default.findById(req.params.id);
        if (survey && survey.user.toString() === req.user._id.toString()) {
            res.json(survey);
        }
        else {
            res.status(404);
            throw new Error('Survey not found');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getSurveyById = getSurveyById;
const createSurvey = async (req, res, next) => {
    try {
        const validatedData = surveySchema.parse(req.body);
        const { title, description } = validatedData;
        const survey = new survey_model_1.default({
            user: req.user._id,
            title,
            description,
            nodes: [],
            edges: [],
        });
        const createdSurvey = await survey.save();
        res.status(201).json(createdSurvey);
    }
    catch (error) {
        next(error);
    }
};
exports.createSurvey = createSurvey;
const updateSurvey = async (req, res, next) => {
    try {
        const validatedData = updateSurveySchema.parse(req.body);
        const survey = await survey_model_1.default.findById(req.params.id);
        if (survey && survey.user.toString() === req.user._id.toString()) {
            survey.title = validatedData.title || survey.title;
            survey.description = validatedData.description || survey.description;
            survey.nodes = validatedData.nodes || survey.nodes;
            survey.edges = validatedData.edges || survey.edges;
            survey.status = validatedData.status || survey.status;
            const updatedSurvey = await survey.save();
            res.json(updatedSurvey);
        }
        else {
            res.status(404);
            throw new Error('Survey not found');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updateSurvey = updateSurvey;
const deleteSurvey = async (req, res, next) => {
    try {
        const survey = await survey_model_1.default.findById(req.params.id);
        if (survey && survey.user.toString() === req.user._id.toString()) {
            await survey.deleteOne();
            res.json({ message: 'Survey removed' });
        }
        else {
            res.status(404);
            throw new Error('Survey not found');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSurvey = deleteSurvey;
const getSurveysAnalytics = async (req, res, next) => {
    try {
        const surveys = await survey_model_1.default.find({ user: req.user._id });
        const surveyIds = surveys.map(s => s._id);
        const totalSurveys = surveys.length;
        const publishedSurveys = surveys.filter(s => s.status === 'published').length;
        const responseCount = await response_model_1.default.countDocuments({ survey: { $in: surveyIds } });
        const eligibleCount = await response_model_1.default.countDocuments({
            survey: { $in: surveyIds },
            status: 'eligible'
        });
        const eligibilityRate = responseCount > 0 ? Math.round((eligibleCount / responseCount) * 100) : 0;
        res.json({
            totalSurveys,
            publishedSurveys,
            totalResponses: responseCount || 0,
            avgEligibilityRate: eligibilityRate,
            recentActivity: []
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSurveysAnalytics = getSurveysAnalytics;
const submitResponse = async (req, res, next) => {
    try {
        const { answers, status } = req.body;
        const response = new response_model_1.default({
            survey: req.params.id,
            user: req.user?._id,
            answers,
            status
        });
        await response.save();
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.submitResponse = submitResponse;
