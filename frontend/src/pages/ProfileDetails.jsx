import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Pencil, Twitch } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ProfileCarousel from "@/components/ProfileCarousel";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPublicProfile, updateCoverImage } from "@/requestAPI/api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/features/authSlice";
import LoadingPage from "./LoadingPage";
import toast from "react-hot-toast";
import EditProfileDialog from "@/components/EditProfileDialog";
const ProfileDetails = () => {
  const [previewCoverImg, setPreviewCoverImg] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [selectedNavigationTab, setSelectedNavigationTab] = useState("Posts");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getPublicProfile(id),
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
    }
    if (isError) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }, [isError, error, data, dispatch]);


  // cover image 👇👇
  const { mutate, isPending } = useMutation({
    mutationFn: updateCoverImage,
  });

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    if (file) {
      setPreviewCoverImg(URL.createObjectURL(file));
      formData.append("coverImg", file);
    }
    mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message, {
          position: "bottom-right",
          duration: 3000,
        });
        dispatch(setUser(data.user));
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong", {
          position: "bottom-right",
          duration: 3000,
        });
      },
    });
  };

  if (isPending || isLoading) {
    return <LoadingPage />;
  }
  console.log(userInfo)
  return (
    <div className="container mx-auto max-w-3xl mt-22">
      {/* Cover and Profile Section */}
      <div className="rounded-xl border bg-background shadow-sm">
        <div className="relative">
          {/* Cover Image */}
          <input
            type="file"
            id="coverImg"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="hidden"
          />
          {userInfo.coverImg ? (
            <img
              loading="lazy"
              src={previewCoverImg || userInfo.coverImg}
              alt="Cover"
              onClick={() => document.getElementById("coverImg").click()}
              onChange={handleCoverImageChange}
              className="h-48 w-full object-cover object-top rounded-t-xl"
            />
          ) : (
            <div
              onClick={() => document.getElementById("coverImg").click()}
              onChange={handleCoverImageChange}
              className="w-full h-48 border flex justify-center items-center text-gray-400 select-none"
            >
              Select your Cover Image
            </div>
          )}

          {/* Profile Image */}
          <div className="absolute -bottom-16 left-6">
            <img
              loading="lazy"
              src={userInfo.avatar}
              alt={userInfo.username}
              className="size-32 rounded-full border-4 border-background object-cover ring-2 ring-primary/10"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="relative pt-20 px-6 pb-6 space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{userInfo.username}</h1>
            <p className="text-muted-foreground">{userInfo.bio}</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { icon: Linkedin, href: "#" },
              { icon: Facebook, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Twitch, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                <social.icon className="size-5 text-muted-foreground hover:text-primary" />
              </a>
            ))}
          </div>

          {/* edit profile handling */}
          <button
            onClick={() => setOpenEditDialog((prev) => !prev)}
            className="absolute top-4 right-4 group inline-flex items-center gap-2 p-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 z-10"
          >
            <Pencil className="w-4 h-4 transition-transform group-hover:rotate-12" />
          </button>
          {/* edit profile component */}
          <EditProfileDialog
            isOpen={openEditDialog}
            setIsOpen={setOpenEditDialog}
            userDetails={userInfo}
          />
        </div>
      </div>

      {/* Activity Section */}
      <div className="mt-4 pt-2 space-y-6 px-3 border rounded-xl bg-b ackground">
        <div className="flex items-start gap-2 flex-col justify-between">
          <h2 className="text-xl font-semibold">Activity</h2>
          <div className="flex gap-6">
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">
                {userInfo.followers.length}
              </strong>{" "}
              followers
            </span>
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">
                {userInfo.following.length}
              </strong>{" "}
              following
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="pb-2">
          <ul className="flex gap-2">
            {["Posts", "Comments", "Videos", "Images"].map((tab) => (
              <li key={tab}>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedNavigationTab(tab)}
                  className={cn(
                    "relative border rounded-3xl px-4 py-2 transition-colors",
                    selectedNavigationTab === tab
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  {tab}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <ProfileCarousel selectedNavigationTab={selectedNavigationTab} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
