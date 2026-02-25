"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const survey_model_1 = __importDefault(require("../models/survey.model"));
const db_1 = __importDefault(require("../config/db"));
dotenv_1.default.config();
const seedDatabase = async () => {
    try {
        await (0, db_1.default)();
        console.log('🌱 Clearing existing data...');
        await user_model_1.default.deleteMany({});
        await survey_model_1.default.deleteMany({});
        console.log('👤 Creating user...');
        const user = await user_model_1.default.create({
            _id: new mongoose_1.default.Types.ObjectId('69799ba9934dbcc2bb7d485e'),
            name: 'John Alison',
            email: 'john@qualiflow.com',
            password: 'john1234',
        });
        const surveys = [
            {
                user: user._id,
                title: 'Flow Builder Test Survey',
                description: 'This is a seeded survey used to test eligibility flow logic.',
                nodes: [],
                edges: [],
                status: 'draft',
            },
            {
                user: user._id,
                title: 'User Research Eligibility Survey',
                description: 'Screening survey to determine eligibility for a UX research study.',
                nodes: [],
                edges: [],
                status: 'draft',
            },
            {
                user: user._id,
                title: 'Market Research Screening',
                description: 'This survey screens participants for a paid market research study.',
                nodes: [],
                edges: [],
                status: 'published',
            },
            {
                user: user._id,
                title: 'Product Feedback Eligibility',
                description: 'Eligibility flow to identify users qualified for product feedback.',
                nodes: [],
                edges: [],
                status: 'draft',
            },
            {
                user: user._id,
                title: 'Internal Flow Builder QA Survey',
                description: 'Internal testing survey for validating flow conditions and endpoints.',
                nodes: [],
                edges: [],
                status: 'published',
            },
        ];
        console.log('📝 Creating survey...');
        // await Survey.create({
        //     user: user._id,
        //     title: 'Flow Builder Test Survey',
        //     description:
        //         'This is a seeded survey used to test eligibility flow logic.',
        //     nodes: [],
        //     edges: [],
        //     status: 'draft',
        // });
        await survey_model_1.default.insertMany(surveys).then(() => {
            console.log("Created");
        });
        console.log('✅ Database seeded successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};
seedDatabase();
