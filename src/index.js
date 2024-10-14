import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './input.css';
//import App from './App';
import Login from "./pages/Login/Login";
import Main from './components/Main';
import Modal from 'react-modal';
import ContractManagement from "./pages/Contracts/ContractManagement";
import SecuredContracts from "./pages/Contracts/SecuredContracts";
import Invoices from "./pages/Invoices/Invoices";
import MaizeReceived from "./pages/Maize_Received/MaizeReceived";
import ContainerMill from "./pages/Production_Mills/ContainerMill";
import GritMill from "./pages/Production_Mills/GritMill";
import MaizeMealMill from "./pages/Production_Mills/MaizeMealMill";
import SampMill from "./pages/Production_Mills/SampMill";
import ScaleReadings from "./pages/Scale_Readings/ScaleReadings";
import OutputReport from "./pages/Reports/OutputReport";
import SiloReport from "./pages/Reports/SiloReport";
import MonthToMonthComparisonReport from "./pages/Reports/MonthToMonthComparisonReport";
import Screenings from "./pages/Screenings/Screenings";
import SalesConfirmation from "./pages/Sales_Confirmation/Sales_Confirmation";
import LoadingScheduleApprovals from "./pages/Loading_Schedules/LoadingScheduleApprovals";
import BookedLoadSchedules from "./pages/Loading_Schedules/BookedLoadSchedules";
import UserManagement from "./pages/Configuration/UserManagement";
import UserRoles from "./pages/Configuration/UserRoles";
import SystemSettings from "./pages/Configuration/SystemSettings";

Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename="">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/main" element={<Main />} />
        <Route exact path="/contractmanagement" element={<ContractManagement />} />
        <Route exact path="/securedcontracts" element={<SecuredContracts />} />
        <Route exact path="/maizereceived" element={<MaizeReceived />} />
        <Route exact path="/containermill" element={<ContainerMill />} />
        <Route exact path="/gritmill" element={<GritMill />} />
        <Route exact path="/maizemealmill" element={<MaizeMealMill />} />
        <Route exact path="/sampmill" element={<SampMill />} />
        <Route exact path="/scalereadings" element={<ScaleReadings />} />
        <Route exact path="/siloreport" element={<SiloReport />} />
        <Route exact path="/outputreport" element={<OutputReport />} />
        <Route exact path="/monthtomonthcomparisonreport" element={<MonthToMonthComparisonReport />} />
        <Route exact path="/screenings" element={<Screenings />} />
        <Route exact path="/salesconfirmation" element={<SalesConfirmation />} />
        <Route exact path="/loadingScheduleApprovals" element={<LoadingScheduleApprovals />} />
        <Route exact path="/bookedloadschedules" element={<BookedLoadSchedules />} />
        <Route exact path="/invoices" element={<Invoices />} />
        <Route exact path="/usermanagement" element={<UserManagement />} />
        <Route exact path="/userroles" element={<UserRoles />} />
        <Route exact path="/systemconfig" element={<SystemSettings />} />

      </Routes>
    </Router>
  </React.StrictMode>
);
