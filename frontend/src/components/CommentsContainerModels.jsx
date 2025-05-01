import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { formatPostTime } from "@/utils/FormatPostTime";
import { Separator } from "./ui/separator";
import { dummyComments, dummyUser } from "@/constant/dummy";

const CommentsContainerModels = ({ isOpen, setIsOpen, postId }) => {
  const [comment, setComment] = useState("");
  const comments = dummyComments;
  let user = dummyUser;

  //   const fetchPostComments = async()=>{} postId will come form props

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your comment submission logic here
    console.log("Comment submitted:", comment);
    setComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>

        {/* Add Comment Section */}
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <img
              loading="lazy"
              src={user.avatar}
              alt="user img"
              className="size-12 rounded-full"
            />
            <div className="flex-1 space-y-2">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="resize-none"
              />
              <Button type="submit" size="sm">
                Post Comment
              </Button>
            </div>
          </form>

          <Separator />

          {/* Comments List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <img
                  loading="lazy"
                  src={comment.user.avatar}
                  alt="user img"
                  className="size-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">
                        {comment.user.username}
                      </span>
                      <time className="text-xs text-muted-foreground">
                        {formatPostTime(comment.createdAt)}
                      </time>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsContainerModels;
