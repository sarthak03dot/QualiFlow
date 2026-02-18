import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema(
    {
        survey: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Survey',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        answers: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            required: true,
        },
        status: {
            type: String,
            enum: ['eligible', 'ineligible'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ResponseModel = mongoose.model('Response', responseSchema);

export default ResponseModel;
