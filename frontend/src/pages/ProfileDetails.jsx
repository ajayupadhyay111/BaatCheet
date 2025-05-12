import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Pencil,
  Twitch,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ProfileCarousel from "@/components/ProfileCarousel";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  followUser,
  getPublicProfile,
  updateCoverImage,
} from "@/requestAPI/api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCoverImg } from "@/store/features/authSlice";
import LoadingPage from "./LoadingPage";
import toast from "react-hot-toast";
import { RiUserFollowLine } from "react-icons/ri";
import EditProfileDialog from "@/components/EditProfileDialog";
import { queryClient } from "@/main";
const ProfileDetails = () => {
  const [previewCoverImg, setPreviewCoverImg] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [profile, setProfile] = useState(null);
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
      setProfile(data.user);
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
        dispatch(setCoverImg(data.coverImgUrl));
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong", {
          position: "bottom-right",
          duration: 3000,
        });
      },
    });
  };

  const { mutate: handleFollow } = useMutation({
    mutationFn: followUser,
  });
  const handleFollowUser = (id) => {
    handleFollow(id, {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries(["user", userInfo._id]);
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.response.data.message || "Something went wrong");
      },
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      {profile && (
        <div className="container mx-auto max-w-3xl mt-22">
          {/* Cover and Profile Section */}
          <div className="rounded-xl border bg-background shadow-sm">
            <div className="relative">
              {/* Cover Image */}
              {userInfo._id === id && (
                <input
                  type="file"
                  id="coverImg"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
              )}
              {profile && profile.coverImg ? (
                <img
                  loading="lazy"
                  src={previewCoverImg || profile.coverImg}
                  alt="Cover"
                  onClick={() => document.getElementById("coverImg").click()}
                  onChange={handleCoverImageChange}
                  className="h-52 w-full object-cover object-center rounded-t-xl"
                />
              ) : (
                <div
                  onClick={() => document.getElementById("coverImg").click()}
                  onChange={handleCoverImageChange}
                  className="w-full h-48 border flex justify-center items-center text-gray-400 select-none"
                >
                  {isPending ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-background">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                  ) : userInfo._id === id ? (
                    <span className="text-sm text-muted-foreground">
                      Click to upload a cover image
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No cover image available
                    </span>
                  )}
                </div>
              )}

              {/* Profile Image */}
              <div className="absolute -bottom-16 left-6">
                <img
                  loading="lazy"
                  src={
                    profile.avatar ||
                    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                  }
                  alt={profile.username}
                  className="size-32 rounded-full border-4 border-background object-cover object-top ring-2 ring-primary/10"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="relative pt-20 px-6 pb-6 space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>
              <div className="flex items-center gap-2">
                {profile?.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-sm text-muted-foreground bg-primary/10 rounded-full px-3 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
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
                {userInfo._id === id ? (
                  ""
                ) : (
                  <Button onClick={() => handleFollowUser(id)}>
                    {userInfo.following.includes(id) ? (
                      <span className="flex items-center gap-1">
                        <RiUserFollowLine /> following
                      </span>
                    ) : (
                      "follow"
                    )}
                  </Button>
                )}
              </div>

              {/* edit profile handling */}
              {userInfo._id === id && (
                <Button
                  variant="outline"
                  className="absolute top-4 right-4"
                  onClick={() => setOpenEditDialog(true)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
              {/* edit profile component */}
              <EditProfileDialog
                isOpen={openEditDialog}
                setIsOpen={setOpenEditDialog}
                userDetails={profile}
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
                    {profile?.followers?.length}
                  </strong>{" "}
                  followers
                </span>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">
                    {profile.following?.length}
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
      )}
    </>
  );
};

export default ProfileDetails;
