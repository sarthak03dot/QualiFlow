import mongoose, { Document } from 'mongoose';

export interface ISurvey extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    nodes: Record<string, unknown>[];
    edges: Record<string, unknown>[];
    status: 'draft' | 'published';
    createdAt: Date;
    updatedAt: Date;
}

const surveySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        nodes: {
            type: Array,
            default: [],
        },
        edges: {
            type: Array,
            default: [],
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
    },
    {
        timestamps: true,
    }
);

const Survey = mongoose.model<ISurvey>('Survey', surveySchema);

export default Survey;
