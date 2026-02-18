import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from '../models/user.model';
import Survey from '../models/survey.model';
import  connectDB  from '../config/db';

dotenv.config();



const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('🌱 Clearing existing data...');
        await User.deleteMany({});
        await Survey.deleteMany({});

        console.log('👤 Creating user...');

        const user = await User.create({
            _id: new mongoose.Types.ObjectId('69799ba9934dbcc2bb7d485e'),
            name: 'Sarthak Singh',
            email: 'sarthak@gmail.com',
            password: 'qwertyuiop',                   
        });
        const surveys = [
            {
                user: user._id,
                title: 'Flow Builder Test Survey',
                description:
                    'This is a seeded survey used to test eligibility flow logic.',
                nodes: [],
                edges: [],
                status: 'draft',
            },
            {
                user: user._id,
                title: 'User Research Eligibility Survey',
                description:
                    'Screening survey to determine eligibility for a UX research study.',
                nodes: [],
                edges: [],
                status: 'draft',
            },
            {
                user: user._id,
                title: 'Market Research Screening',
                description:
                    'This survey screens participants for a paid market research study.',
                nodes: [],
                edges: [],
                status: 'published',
            },
            {
                user: user._id,
                title: 'Product Feedback Eligibility',
                description:
                    'Eligibility flow to identify users qualified for product feedback.',
                nodes: [],
                edges: [],
                status: 'draft',
            },
            {
                user: user._id,
                title: 'Internal Flow Builder QA Survey',
                description:
                    'Internal testing survey for validating flow conditions and endpoints.',
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

        await Survey.insertMany(surveys).then(()=>{
            console.log("Created");
            
        });

        console.log('✅ Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
