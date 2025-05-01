import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/protectRoutes/ProtectPrivateRoutes";
import ProtectAuthRoutes from "./components/protectRoutes/ProtectAuthRoutes";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import LoadingPage from "./pages/LoadingPage";
import ProfileDetails from "./pages/ProfileDetails";
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingPage/>}>
        <Routes>
          {/* auth routes */}
          <Route element={<ProtectAuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* other private routes */}

          <Route element={<ProtectRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/user/:id" element={<ProfileDetails />} />
            <Route path="/profile" element={<ProfileDetails />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
};

export default App;
