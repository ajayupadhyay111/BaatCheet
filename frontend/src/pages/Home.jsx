import React from "react";
import { dummyPosts, dummyUser } from "@/constant/dummy";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import { useSelector } from "react-redux";
const Home = () => {
  let {userInfo} = useSelector(state=>state.user);

  let posts = dummyPosts;
  return (
    <div className="flex gap-4 md:flex-row flex-col">
      <div className="bg-background border rounded-xl p-6 w-full h-fit md:w-[30%] top-20">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Image */}
          <div className="relative">
            <img
              loading="lazy"
              src={userInfo.avatar}
              alt={userInfo.username}
              className="size-24 rounded-full ring-4 ring-primary/10 object-cover"
            />
            <div className="absolute bottom-0 right-0 size-6 rounded-full bg-green-500 border-4 border-background"></div>
          </div>

          {/* User Info */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">{userInfo.username}</h2>
            <p className="text-sm text-muted-foreground max-w-[250px]">
              {userInfo.bio}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6 items-center p-4 w-full justify-center border rounded-lg bg-muted/50">
            <div className="text-center">
              <p className="text-2xl font-bold">{userInfo?.followers?.length}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="h-10 w-[1px] bg-border"></div>
            <div className="text-center">
              <p className="text-2xl font-bold">{userInfo.following?.length}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg w-full md:w-[calc(100%-40%)]">
        {/* create post */}
        <CreatePost user={userInfo} />

        {/* posts */}
        <div className="w-full">
          {posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
