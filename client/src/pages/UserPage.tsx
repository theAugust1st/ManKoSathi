import { useState } from "react";
import { toast } from 'react-toastify';
import Button from "../components/ui/Button";
import { LogOut, SquarePen } from "lucide-react";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { updateUserProfile } from "../services/profileServices";

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  dob?: string;
  gender?: "Male" | "Female" | "Others" | "Prefer Not To Say";
  language_preference?: "English" | "Nepali";
};

const schema = z.object({
  userName: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters." })
    .max(20, { message: "Name should not be longer than 20 characters." }),
  email: z.string().email(),
  dob: z.string(),
  gender: z.enum(["Male", "Female", "Others", "Prefer Not To Say"]),
  language_preference: z.enum(["English", "Nepali"]),
});
// helper function to ensure correct format
const formatDateForInput = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

function ProfilePage() {
  const { user, setUser, logout } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: user?.name || "",
      email: user?.email || "",
      dob: formatDateForInput(user?.dob) || "",
      gender: user?.gender,
      language_preference: user?.language_preference || "English",
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (!user) return;
    const updatedProfile: UserProfile = {
      ...user,
      _id: user._id,
      name: data.userName,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
      language_preference: data.language_preference,
    };
    try {
      const response = await updateUserProfile(updatedProfile)
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success('Profile updated!');

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
      return;
    }
    setUser(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl p-4 md:p-6 space-y-2 md:space-y-6 ">
      <div className="flex justify-between items-center">
        <header className="md:space-y-1">
          <h1 className="text-lg sm:text-xl lg:text-4xl font-bold">
            User Profile
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm">
            Manage your account settings and preferences
          </p>
        </header>
        <button
          onClick={logout}
          className="flex items-center gap-2 border border-gray-400 py-1 px-4 md:py-2 md:px-4 rounded-lg hover:bg-red-100 hover:text-red-700 "
        >
          <LogOut className="h-4 w-4 md:h-6 md:w-6" />
          <span className="text-sm md:text-base font-bold md:text-bold">Logout</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow rounded-lg p-4 space-y-3 md:space-y-6"
      >
        <div className="flex justify-between items-center ">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold">
            Personal Information
          </h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditing((prev) => !prev);
            }}
            className="bg-brand-400 text-white gap-1 py-2 px-3 flex justify-center items-center md:gap-2 text-sm md:text-base rounded-lg hover:bg-brand-500"
          >
            <SquarePen className="h-4 w-4 md:h-6 md:w-6" /> {isEditing ? "Close" : "Edit Profile"}
          </button>
        </div>

        {/* User info and inputs */}
        <div className="flex flex-col gap-3 md:gap-6">
          <Input
            id="userName"
            label="Full Name"
            placeholder="Full Name"
            register={register}
            error={errors.userName}
            bgColor="white"
            disabled={!isEditing}
          />

          <div className="flex flex-col">
            <Input
              id="email"
              label="Email"
              register={register}
              error={errors.email}
              bgColor={"white"}
              disabled
              placeholder="a@b.c"
            />
            {isEditing && <p className="text-gray-400 text-xs mt-1">
              Email is not changeable.
            </p>}
          </div>

          <Input
            id="dob"
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            type="date"
            register={register}
            error={errors.dob}
            bgColor={"white"}
            disabled={!isEditing}
          />

          <div>
            <label className="block text-xs md:text-sm font-medium" htmlFor="gender">
              Gender:
            </label>
            <select
              className={`w-full border px-4 py-2 rounded-md bg-white text-brand-950 placeholder:brand-300 focus:outline-none focus:ring-2 transition-colors duration-200 
              ${
                errors.gender
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-brand-300 focus:border-brand-500 focus:ring-brand-200"
              }`}
              id="gender"
              {...register("gender")}
              disabled={!isEditing}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
              <option value="Prefer Not To Say">Prefer Not To Say</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-xs mt-1">
                {"*" + errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-xs md:text-sm font-medium"
              htmlFor="language_preference"
            >
              Language:
            </label>
            <select
              className="w-full border px-4 py-2 rounded-md bg-white text-brand-950 placeholder:brand-300 focus:outline-none focus:ring-2 transition-colors duration-200"
              id="language_preference"
              {...register("language_preference")}
              disabled
            >
              <option value="">Select</option>
              <option value="English">English</option>
              <option value="Nepali">Nepali</option>
            </select>
            {isEditing && <p className="text-gray-400 text-xs mt-1">
              Language translation coming soon....
            </p>}
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center gap-2">
            <Button type="submit" variant="primary" className="sm:w-full">
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              className="sm:w-full"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
