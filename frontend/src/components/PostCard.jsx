import { formatPostTime } from "@/utils/FormatPostTime";
import { ThumbsUp, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentsContainerModels from "./CommentsContainerModels";

const PostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <Card className="w-full mb-4 bg-background">
      <CardHeader className="px-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3 items-center">
            <img
              loading="lazy"
              onClick={() => navigate(`/user/${post.createdBy._id}`)}
              src={post.createdBy.avatar}
              alt={post.createdBy.username}
              className="size-14 rounded-full object-cover ring-2 ring-primary/10"
            />
            <div className="flex flex-col">
              <span
                onClick={() => navigate(`/user/${post.createdBy._id}`)}
                className="font-medium hover:underline"
              >
                {post.createdBy.username}
              </span>
              <span className="text-sm text-muted-foreground line-clamp-1">
                {post.createdBy.bio}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatPostTime(post.createdAt)}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {post.caption && (
          <div className="flex items-start">
            <p
              className={`text-sm flex-1 mb-2 whitespace-pre-wrap transition-all duration-300 ${
                expanded ? "" : "line-clamp-1"
              }`}
            >
              {post.caption}
            </p>

            {/* Show button only if text is long */}
            <button
              hidden={expanded}
              className="text-blue-500 text-sm font-medium hover:underline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        )}
        {post.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              loading="lazy"
              src={post.image}
              alt="Post content"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">
                {post.likes.length} likes
              </span>
            </div>
            <span
              onClick={() => setIsCommentsOpen(true)}
              className="text-sm cursor-pointer"
            >
              {post.comments.length} comments
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="flex-1">
              <ThumbsUp className="h-4 w-4 mr-2" />
              <span className="">Like</span>
            </Button>
            <Button
              onClick={() => setIsCommentsOpen(true)}
              variant="ghost"
              size="sm"
              className="flex-1"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Comment
            </Button>
            {/* model */}
            <CommentsContainerModels
              isOpen={isCommentsOpen}
              setIsOpen={setIsCommentsOpen}
              postId={post._id}
            />
            <Button variant="ghost" size="sm" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
