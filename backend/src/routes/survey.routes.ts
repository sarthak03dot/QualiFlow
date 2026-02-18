import express from 'express';
import {
    getSurveys,
    getSurveyById,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    getSurveysAnalytics,
    submitResponse,
} from '../controllers/survey.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.use(protect); 

router.get('/analytics', getSurveysAnalytics);
router.route('/').get(getSurveys).post(createSurvey);
router.post('/:id/responses', submitResponse);
router.route('/:id').get(getSurveyById).put(updateSurvey).delete(deleteSurvey);

export default router;
