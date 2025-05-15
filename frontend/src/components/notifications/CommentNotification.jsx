import { formatPostTime } from "@/utils/FormatPostTime";
import { cn } from "@/lib/utils";

const CommentNotification = ({ notification }) => {
  console.log(notification);
  return (
    <div
      className={cn(
        "group relative flex gap-4 rounded-lg border p-4 transition-colors",
        "hover:bg-muted/50",
        !notification.isRead
          ? "bg-primary/5 border-primary/10"
          : "bg-card border-border"
      )}
    >
      {/* User Avatar */}
      <img
        loading="lazy"
        src={notification.sender.avatar || "https://aul.edu.ng/static/images/user.jpg"}
        className={cn(
          "size-12 rounded-full object-cover",
          !notification.isRead
            ? "ring-2 ring-primary"
            : "ring-2 ring-primary/10"
        )}
        alt={`${notification.sender.username}'s avatar`}
      />

      {/* Notification Content */}
      <div className="flex flex-col space-y-2 flex-1">
        <span className="text-sm">
          <span className="font-medium hover:text-primary cursor-pointer">
            {notification.sender.username}
          </span>{" "}
          commented on your post
          {!notification.isRead && (
            <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary"></span>
          )}
        </span>
        {notification.comment && (
          <span class="inline-block bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-md max-w-xs break-words">
           {notification.comment}
          </span>
        )}

        <div
          className={cn(
            "flex items-start gap-3 rounded-lg border p-3",
            !notification.isRead
              ? "bg-background border-primary/10"
              : "bg-background/50 border-border"
          )}
        >
          {notification.post.image && (
            <img
              loading="lazy"
              src={notification.post.image}
              className="size-16 rounded-md object-cover"
              alt="Post preview"
            />
          )}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {notification.post.caption}
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <time className="text-xs text-muted-foreground">
        {formatPostTime(notification.createdAt)}
      </time>
    </div>
  );
};

export default CommentNotification;
