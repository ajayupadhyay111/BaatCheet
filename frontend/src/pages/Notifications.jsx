import CommentNotification from "@/components/notifications/CommentNotification";
import LikeNotification from "@/components/notifications/LikeNotification";
import FollowNotification from "@/components/notifications/FollowNotification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { markAsRead } from "@/requestAPI/api/notificationAPI";
import { setNotificationCount } from "@/store/features/notificationSlice";
import { queryClient } from "@/main";

const Notifications = () => {
  const { notifications } = useSelector((state) => state.notification);
  const { userInfo:user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {mutate:readNotification} = useMutation({
    mutationFn:markAsRead
  });
  useEffect(()=>{
    readNotification({},{
      onSuccess: (data) => {
        dispatch(setNotificationCount(0));
        queryClient.invalidateQueries(["notifications"]);
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  },[])
  return (
    <div className="flex gap-4 md:flex-row flex-col">
      <div className="bg-background border rounded-xl p-6 w-full h-fit md:w-[30%] top-20">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Image */}
          <div className="relative">
            <img
              loading="lazy"
              src={user.avatar || "https://aul.edu.ng/static/images/user.jpg"}
              alt={user.username}
              className="size-24 rounded-full ring-4 object-top ring-primary/10 object-cover"
            />
            <div className="absolute bottom-0 right-0 size-6 rounded-full bg-green-500 border-4 border-background"></div>
          </div>

          {/* User Info */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-sm text-muted-foreground max-w-[250px]">
              {user.bio}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6 items-center p-4 w-full justify-center border rounded-lg bg-muted/50">
            <div className="text-center">
              <p className="text-2xl font-bold">{user.followers.length}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="h-10 w-[1px] bg-border"></div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user.following.length}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border h-fit p-2 w-full md:w-[calc(100%-30%)] flex flex-col gap-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            if (notification.type === "comment") {
              return (
                <CommentNotification
                  key={notification._id}
                  notification={notification}
                />
              );
            } else if (notification.type === "like") {
              return (
                <LikeNotification
                  key={notification._id}
                  notification={notification}
                />
              );
            } else if (notification.type === "follow") {
              return (
                <FollowNotification
                  key={notification._id}
                  notification={notification}
                />
              );
            }
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
