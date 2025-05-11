import React, { useState } from "react";
import { ImageIcon, Loader2, SmileIcon, VideoIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ExpandableTextarea } from "@/utils/ExpandableTextarea";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/requestAPI/api/postAPI";
import toast from "react-hot-toast";
import { queryClient } from "@/main";

const CreatePost = ({ user }) => {
  const [text, setText] = useState(null);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", text);
    if (image) {
      formData.append("post", image);
    } else if (video) {
      formData.append("post", video);
    }

    mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message, {
          position: "bottom-right",
          duration: 3000,
        });
        setOpenDialog(false)
        queryClient.invalidateQueries(["posts"])
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 3000,
        });
      },
    });
  };

  const handleVideo = async () => {
    let input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        setVideo(file);
        const videoUrl = URL.createObjectURL(file);

        // Get the target container
        const container = document.getElementById("media-container");

        // Optional: clear old value
        container.innerHTML = "";

        // Create video element
        const video = document.createElement("video");
        video.src = videoUrl;
        video.controls = true;
        video.width = 300;

        // Optional: remove previous video if needed
        const existing = document.getElementById("video-preview");
        if (existing) existing.remove();

        // Add an ID for future reference
        video.id = "video-preview";

        // Append to the container
        container.appendChild(video);
        setImage(null); // clear image if any video is selected
      }
    };
    input.click();
  };

  const handleImage = () => {
    let input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = () => {
      let file = input.files[0];
      if (file) {
        setImage(file);
        let imageURL = URL.createObjectURL(file);

        // Get the target container
        const container = document.getElementById("media-container");

        // Optional: clear old value
        container.innerHTML = "";

        // create image element
        const image = document.createElement("img");
        image.src = imageURL;
        image.alt = "image";
        image.width = 300;

        // Append to the container
        container.appendChild(image);
        setVideo(null); // clear video if any image is selected
      }
    };
    input.click();
  };
  return (
    <div className="bg-background border rounded-xl p-4 mb-4">
      <Dialog className="" open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <div className="flex gap-3" onClick={()=>setOpenDialog(true)}>
            <img
              loading="lazy"
              src={user.avatar||"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
              className="size-12 rounded-full ring-2 object-cover object-top ring-primary/10"
              alt="user avatar"
            />
            <div className="flex-1">
              <Input
                type="text"
                placeholder="What's on your mind?"
                className="border-none focus-visible:ring-0 text-lg"
              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Expandable textarea */}
            <ExpandableTextarea
              placeholder={"What's on your mind?"}
              text={text}
              setText={setText}
            />

            <div id="media-container"></div>
            <Separator />
            <div className="flex items-center gap-2">
              <Button
                onClick={handleImage}
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <ImageIcon className="h-5 w-5 mr-2" />
                Image
              </Button>

              {/* Hiding video upload functionality */}
              {/* <Button
                onClick={handleVideo}
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <VideoIcon className="h-5 w-5 mr-2" />
                Video
              </Button> */}
              
              {/* <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <SmileIcon className="h-5 w-5 mr-2" />
                Feeling
              </Button> */}
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="w-20">
                {isPending ? (
                  <div className="w-full animate-spin h-full flex items-center justify-center">
                    <Loader2 />
                  </div>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
