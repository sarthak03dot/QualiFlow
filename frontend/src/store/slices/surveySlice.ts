import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Survey } from '../../types';

interface SurveyState {
    surveys: Survey[];
    currentSurvey: Survey | null;
    loading: boolean;
    error: string | null;
}

const initialState: SurveyState = {
    surveys: [],
    currentSurvey: null,
    loading: false,
    error: null,
};

const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        setSurveys: (state, action: PayloadAction<Survey[]>) => {
            state.surveys = action.payload;
        },
        setCurrentSurvey: (state, action: PayloadAction<Survey>) => {
            state.currentSurvey = action.payload;
        },
        addSurvey: (state, action: PayloadAction<Survey>) => {
            state.surveys.push(action.payload);
        },
        updateSurveyInList: (state, action: PayloadAction<Survey>) => {
            const index = state.surveys.findIndex((s) => s._id === action.payload._id);
            if (index !== -1) {
                state.surveys[index] = action.payload;
            }
            if (state.currentSurvey?._id === action.payload._id) {
                state.currentSurvey = action.payload;
            }
        },
        removeSurvey: (state, action: PayloadAction<string>) => {
            state.surveys = state.surveys.filter((s) => s._id !== action.payload);
            if (state.currentSurvey?._id === action.payload) {
                state.currentSurvey = null;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setSurveys,
    setCurrentSurvey,
    addSurvey,
    updateSurveyInList,
    removeSurvey,
    setLoading,
    setError,
} = surveySlice.actions;
export default surveySlice.reducer;
