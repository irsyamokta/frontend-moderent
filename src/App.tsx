import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/common/ScrollToTop";
import 'react-toastify/dist/ReactToastify.css';

import DashboardLayout from "./layouts/DashboardLayout";

import PublicRoute from "./routes/PublicRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";

import NotFound from "./pages/Errors/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

import Home from "./pages/Dashboard/Home";
import UserProfile from "./pages/Profile/UserProfile";
import Users from "./pages/Dashboard/Users";
import Brand from "./pages/Dashboard/Brand";
import Vehicle from "./pages/Dashboard/Vehicle";


function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ToastContainer style={{ zIndex: 9999 }} position="top-center" autoClose={3000} />
          <ScrollToTop />
          <Routes>
            {/* Route Public */}
            <Route path="/" element={<PublicRoute />}>
              <Route index element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>

            {/* Route Admin */}
            <Route path="/admin" element={
              <PrivateRoute>
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              </PrivateRoute>
            }>

              <Route index element={<Home />} />
              <Route path="pengguna" element={<Users />} />
              <Route path="brand" element={<Brand />} />
              <Route path="kendaraan" element={<Vehicle />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App