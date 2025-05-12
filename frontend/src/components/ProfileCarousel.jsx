import { dummyPosts } from "@/constant/dummy";
import React from "react";
import PostCard from "./PostCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
const ProfileCarousel = ({ selectedNavigationTab }) => {
  
  const posts = dummyPosts;
  switch (selectedNavigationTab) {
    case "Videos":
      return <div>Videos Carousel</div>;
    case "Images":
      return <div>Photos Carousel</div>;
    case "Posts":
      return (
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {posts.map((post) => (
              <CarouselItem
                key={post._id}
                className="pl-4 basis-[94%] md:basis-[35%] lg:basis-[40%]"
              >
                <PostCard post={post} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="hidden md:flex absolute -left-5 h-10 w-10 border-2 opacity-70 hover:opacity-100 transition-opacity"
            icon={ChevronLeft}
          />
          <CarouselNext
            className="hidden md:flex absolute -right-5 h-10 w-10 border-2 opacity-70 hover:opacity-100 transition-opacity "
            icon={ChevronRight}
          />
        </Carousel>
      );
    case "Comments":
      return <div>Comment Carousel</div>;
    default:
      return <div>Select a tab</div>;
  }
};

export default ProfileCarousel;
