import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/protectRoutes/ProtectPrivateRoutes";
import ProtectAuthRoutes from "./components/protectRoutes/ProtectAuthRoutes";
import LoadingPage from "./pages/LoadingPage";
import { getUser } from "./requestAPI/api/userAPI";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./store/features/authSlice";
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const Feed = lazy(() => import("@/pages/Feed"));
const Chat = lazy(() => import("@/pages/Chat"));
import Notifications from "@/pages/Notifications";
const ProfileDetails = lazy(() => import("@/pages/ProfileDetails"));
const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    retry: false,
  });
  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
    } else if (isError) {
      localStorage.removeItem("token");
      dispatch(clearUser());
      navigate("/login");
    }
  }, [data, isError, dispatch]);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
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
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
};

export default App;
