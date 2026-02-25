"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const survey_controller_1 = require("../controllers/survey.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.protect);
router.get('/analytics', survey_controller_1.getSurveysAnalytics);
router.route('/').get(survey_controller_1.getSurveys).post(survey_controller_1.createSurvey);
router.post('/:id/responses', survey_controller_1.submitResponse);
router.route('/:id').get(survey_controller_1.getSurveyById).put(survey_controller_1.updateSurvey).delete(survey_controller_1.deleteSurvey);
exports.default = router;
