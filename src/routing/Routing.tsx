import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/userArea/login/LoginPage";
import RegisterPage from "../components/userArea/register/RegisterPage";
import RoutingGuard from "./RoutingGuard";
import type { JSX } from "react";
import PreferencesPage from "../components/preferencesArea/PreferencesPage";
import DashboardPage from "../components/dashboardArea/DashboardPage";


function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/preferences" element={<RoutingGuard child={<PreferencesPage />} />} />
            <Route path="/dashboard" element={<RoutingGuard child={<DashboardPage />} />} />
            <Route path="/" element={<LoginPage />} />
        </Routes>
    );
}

export default Routing;