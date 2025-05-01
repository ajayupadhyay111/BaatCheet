import { formatPostTime } from "@/utils/FormatPostTime";
import { cn } from "@/lib/utils";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const FollowNotification = ({ notification }) => {
  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 rounded-lg border p-4 transition-colors",
        "hover:bg-muted/50",
        !notification.isRead
          ? "bg-primary/5 border-primary/10"
          : "bg-card border-border"
      )}
    >
      {/* User Avatar */}
      <img
        loading="lazy"
        src={notification.sender.avatar}
        className={cn(
          "size-12 rounded-full object-cover",
          !notification.isRead
            ? "ring-2 ring-primary"
            : "ring-2 ring-primary/10"
        )}
        alt={`${notification.sender.username}'s avatar`}
      />

      {/* Notification Content */}
      <div className="flex flex-1 items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium hover:text-primary cursor-pointer">
              {notification.sender.username}
            </span>{" "}
            followed you
            {!notification.isRead && (
              <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary"></span>
            )}
          </p>
          <time className="text-xs text-muted-foreground block">
            {formatPostTime(notification.createdAt)}
          </time>
        </div>
      </div>
    </div>
  );
};

export default FollowNotification;
