import { Button } from "@/components/ui/button";
import { dummyUser } from "@/constant/dummy";
import { Facebook, Instagram, Linkedin, Twitch } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ProfileCarousel from "@/components/ProfileCarousel";
const ProfileDetails = () => {
  let user = dummyUser;
  const [selectedNavigationTab, setSelectedNavigationTab] = useState("Posts");

  return (
    <div className="container mx-auto max-w-6xl mt-22">
      {/* Cover and Profile Section */}
      <div className="rounded-xl border bg-background shadow-sm">
        <div className="relative">
          {/* Cover Image */}
          <img
            loading="lazy"
            src="https://marketplace.canva.com/EAECJXaRRew/3/0/1600w/canva-do-what-is-right-starry-sky-facebook-cover-4SpKW5MtQl4.jpg"
            alt="Cover"
            className="h-48 w-full object-cover object-top rounded-t-xl"
          />

          {/* Profile Image */}
          <div className="absolute -bottom-16 left-6">
            <img
              loading="lazy"
              src={user.avatar}
              alt={user.username}
              className="size-32 rounded-full border-4 border-background object-cover ring-2 ring-primary/10"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="pt-20 px-6 pb-6 space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-muted-foreground">{user.bio}</p>
          </div>

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
        </div>
      </div>

      {/* Activity Section */}
      <div className="mt-4 pt-2 space-y-6 px-3 border rounded-xl bg-background">
        <div className="flex items-start gap-2 flex-col justify-between">
          <h2 className="text-xl font-semibold">Activity</h2>
          <div className="flex gap-6">
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">
                {user.followers.length}
              </strong>{" "}
              followers
            </span>
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">
                {user.following.length}
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
  );
};

export default ProfileDetails;
