// components/EditProfileDialog.jsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Camera, Link2, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/requestAPI/api/userAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/features/authSlice";

export default function EditProfileDialog({ isOpen, setIsOpen, userDetails }) {
  const [imgPreview, setImgPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    username: "", // changed from name
    bio: "",
    email: "",
    avatar: null,
    skills: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails) setForm({ ...form, ...userDetails });
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      let imgUrl = URL.createObjectURL(files[0]);
      setImgPreview(imgUrl);
      setImage(files[0]);
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  let { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateProfile,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        if (key === "avatar") {
          formData.append(key, image);
        } else {
          formData.append(key, form[key]);
        }
      }
    });
    mutate(formData, {
      onSuccess: (data) => {
        dispatch(setUser(data.user));
        toast.success("Profile updated successfully", {
          position: "bottom-right",
          duration: 3000,
        });
      },
      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data.message || "Something went wrong", {
          position: "bottom-right",
          duration: 3000,
        });
      },
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" p-6 h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between w-full mb-6">
            <DialogTitle className="text-2xl font-bold">
              Edit Profile
            </DialogTitle>
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 no-scrollbar overflow-y-auto"
        >
          {/* Avatar Section */}
          <div className="flex sm:flex-row flex-col justify-between items-center md:px-6">
            <div className="relative h-fit inline-block">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-100 overflow-hidden">
                {form.avatar ? (
                  <img
                    src={imgPreview || form.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <Label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-50"
              >
                <Camera className="h-4 w-4 text-gray-800" />
                <Input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </Label>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="@username"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  value={form.bio}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          {/* <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Social Links
            </h3>
            <div className="space-y-3 flex flex-wrap justify-between">
              {["twitter", "instagram", "linkedin", "github"].map((social) => (
                <div key={social}>
                  <Label
                    htmlFor={social}
                    className="capitalize text-sm font-medium"
                  >
                    {social}
                  </Label>
                  <Input
                    id={social}
                    name={social}
                    value={form[social]}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder={`Your ${social} profile`}
                  />
                </div>
              ))}
            </div>
          </div> */}
          {/* </div> */}

          {/* Skills Section */}
          <div>
            <Label htmlFor="skills" className="text-sm font-medium">
              Skills
            </Label>
            <Input
              id="skills"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="mt-1"
              placeholder="React, Node.js, CSS, etc."
            />
          </div>

          {/* Error Message */}
          {isError && (
            <p className="text-red-500 text-sm mt-2">
              {error?.response?.data?.message || "Something went wrong"}
            </p>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
