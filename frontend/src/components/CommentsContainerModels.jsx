import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { formatPostTime } from "@/utils/FormatPostTime";
import { Separator } from "./ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addComment, getPostComments } from "@/requestAPI/api/commentAPI";
import toast from "react-hot-toast";
import { queryClient } from "@/main";
import { useSelector } from "react-redux";

const CommentsContainerModels = ({ isOpen, setIsOpen, postId }) => {
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  // get all comments related to this post
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getPostComments(postId),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Add comment
  const { mutate, isPending } = useMutation({
    mutationFn: addComment,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { postId, comment },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries(["posts"]);
          queryClient.invalidateQueries(["comments", postId]);
        }, 
        onError: (error) => {
          console.log(error);
          toast.error(error.response.data.message || "Something went wrong");
        },
      }
    );
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
              src={userInfo.avatar}
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
                {isPending ? "posting..." : "Post Comment"}
              </Button>
            </div>
          </form>

          <Separator />

          {/* Comments List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
            {comments &&
              comments.map((comment) => (
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
            {comments?.length <= 0 ? (
              <p className="flex justify-center">No Comment yet</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsContainerModels;
