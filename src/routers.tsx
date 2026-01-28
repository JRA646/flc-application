import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./Login";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Cities from "./pages/MasterData/Cities";
import Countries from "./pages/MasterData/Countries";
import States from "./pages/MasterData/States";
import Neighborhood from "./pages/MasterData/Neighborhood";
import Ministries from "./pages/MasterData/Ministries";
import Service from "./pages/Maintenance/Service";
import Campus from "./pages/Maintenance/Campus";
import Attendance from "./pages/Attendance";
import Member from "./pages/Member";
import Hierarchies from "./pages/MasterData/Hierarchies";
import CellGroup from "./pages/Maintenance/CellGroup";
import Profile from "./pages/Profile";
// import CampusDetails from "./pages/Campus";
import ServiceTypes from "./pages/MasterData/ServiceTypes";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
     path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          // index route
          { index: true, element: <Navigate to="dashboard" replace /> },

          // actual routes
          { path: "dashboard", element: <Dashboard /> },
          { path: "report", element: <Report /> },
          { path: "/masterdata/cities", element: <Cities /> },
          { path: "/masterdata/countries", element: <Countries /> },
          { path: "/masterdata/states", element: <States /> },
          { path: "/masterdata/neighborhood", element: <Neighborhood /> },
          { path: "/maintenance/campus", element: <Campus /> },
          { path: "/masterdata/ministries", element: <Ministries /> },
          { path: "/maintenance/service", element: <Service /> },
          { path: "attendance", element: <Attendance /> },
          { path: "member", element: <Member /> },
          { path: "/masterdata/hierarchies", element: <Hierarchies />},
          { path: "/maintenance/cellgroup", element: <CellGroup /> },
          { path: "/profile", element: <Profile /> },
          // { path: "/campuses/:id", element: <CampusDetails /> },
          { path: "/masterdata/servicetypes", element: <ServiceTypes /> },
        ],
      },
    ],
  },
],
{
    basename: "/flc-application",
  });
