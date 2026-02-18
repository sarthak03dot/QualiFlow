import { NextFunction, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Survey from '../models/survey.model';
import ResponseModel from '../models/response.model';
import { z } from 'zod';

const surveySchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    nodes: z.array(z.record(z.string(), z.unknown())).optional(),
    edges: z.array(z.record(z.string(), z.unknown())).optional(),
    status: z.enum(['draft', 'published']).optional(),
});

const updateSurveySchema = surveySchema.partial();

export const getSurveys = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const surveys = await Survey.find({ user: req.user!._id });
        res.json(surveys);
    } catch (error) {
        next(error);
    }
};

export const getSurveyById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const survey = await Survey.findById(req.params.id);

        if (survey && survey.user.toString() === req.user!._id.toString()) {
            res.json(survey);
        } else {
            res.status(404);
            throw new Error('Survey not found');
        }
    } catch (error) {
        next(error);
    }
};

export const createSurvey = async (req: AuthRequest, res: Response, next: NextFunction) => {

    try {
        const validatedData = surveySchema.parse(req.body);
        const { title, description } = validatedData;

        const survey = new Survey({
            user: req.user!._id,
            title,
            description,
            nodes: [],
            edges: [],
        });

        const createdSurvey = await survey.save();
        res.status(201).json(createdSurvey);
    } catch (error) {
        next(error);
    }
};

export const updateSurvey = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const validatedData = updateSurveySchema.parse(req.body);
        const survey = await Survey.findById(req.params.id);

        if (survey && survey.user.toString() === req.user!._id.toString()) {
            survey.title = validatedData.title || survey.title;
            survey.description = validatedData.description || survey.description;
            survey.nodes = validatedData.nodes || survey.nodes;
            survey.edges = validatedData.edges || survey.edges;
            survey.status = validatedData.status || survey.status;

            const updatedSurvey = await survey.save();
            res.json(updatedSurvey);
        } else {
            res.status(404);
            throw new Error('Survey not found');
        }
    } catch (error) {
        next(error);
    }
};

export const deleteSurvey = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const survey = await Survey.findById(req.params.id);

        if (survey && survey.user.toString() === req.user!._id.toString()) {
            await survey.deleteOne();
            res.json({ message: 'Survey removed' });
        } else {
            res.status(404);
            throw new Error('Survey not found');
        }
    } catch (error) {
        next(error);
    }
};
export const getSurveysAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const surveys = await Survey.find({ user: req.user!._id });
        const surveyIds = surveys.map(s => s._id);

        const totalSurveys = surveys.length;
        const publishedSurveys = surveys.filter(s => s.status === 'published').length;

     
        const responseCount = await ResponseModel.countDocuments({ survey: { $in: surveyIds } });
        const eligibleCount = await ResponseModel.countDocuments({
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
    } catch (error) {
        next(error);
    }
};

export const submitResponse = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { answers, status } = req.body;
        const response = new ResponseModel({
            survey: req.params.id,
            user: req.user?._id, 
            answers,
            status
        });
        await response.save();
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};
