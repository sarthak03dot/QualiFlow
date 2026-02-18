import express,{ Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import surveyRoutes from './routes/survey.routes';

dotenv.config();

connectDB();

const app: Application = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.get('/', (req: Request, res: Response) => {
    res.send('API is running..., Please Test By API Tools');
});

app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
