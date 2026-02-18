import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import SurveyBuilder from "../pages/surveys/SurveyBuilder";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/surveys/new"
                element={
                    <ProtectedRoute>
                        <SurveyBuilder />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
