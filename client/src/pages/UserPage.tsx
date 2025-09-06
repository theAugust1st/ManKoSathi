import { useState } from "react";
import Button from "../components/ui/Button";
import { LogOut, SquarePen } from "lucide-react";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import z, { check } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UserProfile = {
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
  email: z.string(),
  dob: z.string(),
  gender: z.enum(["Male", "Female", "Others", "Prefer Not To Say"]),
  language_preference: z.enum(["English", "Nepali"]),
});

function ProfilePage() {
    const [user, setUser] = useState<UserProfile>({
    name: "Demo User",
    email: "demo@example.com",
    dob: "2000-01-01",
    gender: "Male",
    language_preference: "English",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema),  defaultValues: {
    userName: user.name,
    email: user.email,
    dob: user.dob,
    gender: user.gender,
    language_preference: user.language_preference,
  } });


  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {};

  const handleSave = () => {
    // TODO: Replace with API call
    setUser(form);
    setIsEditing(false);
    alert("Profile updated!");
  };

  const handleCancel = () => {
    setForm(user);
    setIsEditing(false);
  };

  return (
    // <div className="max-w-2xl mx-auto p-6 space-y-6">
    //   <h1 className="text-3xl font-bold text-brand-950">Profile</h1>

    //   <div className="bg-white shadow rounded-lg p-6 space-y-4">
    //     {/* Name */}
    //     <div>
    //       <label className="block text-sm font-medium text-gray-700">Name</label>
    //       {isEditing ? (
    //         <input
    //           type="text"
    //           name="name"
    //           value={form.name}
    //           onChange={handleChange}
    //           className="mt-1 w-full border p-2 rounded-lg"
    //         />
    //       ) : (
    //         <p className="mt-1 text-brand-900">{user.name}</p>
    //       )}
    //     </div>

    //     {/* Email */}
    //     <div>
    //       <label className="block text-sm font-medium text-gray-700">Email</label>
    //       <p className="mt-1 text-brand-900">{user.email}</p>
    //       <p className="text-xs text-gray-500">Email cannot be changed</p>
    //     </div>

    //     {/* DOB */}
    //     <div>
    //       <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
    //       {isEditing ? (
    //         <input
    //           type="date"
    //           name="dob"
    //           value={form.dob || ""}
    //           onChange={handleChange}
    //           className="mt-1 w-full border p-2 rounded-lg"
    //         />
    //       ) : (
    //         <p className="mt-1 text-brand-900">{user.dob}</p>
    //       )}
    //     </div>

    //     {/* Gender */}
    //     <div>
    //       <label className="block text-sm font-medium text-gray-700">Gender</label>
    //       {isEditing ? (
    //         <select
    //           name="gender"
    //           value={form.gender || ""}
    //           onChange={handleChange}
    //           className="mt-1 w-full border p-2 rounded-lg"
    //         >
    //           <option value="">Select</option>
    //           <option value="Male">Male</option>
    //           <option value="Female">Female</option>
    //           <option value="Others">Others</option>
    //           <option value="Prefer Not To Say">Prefer Not To Say</option>
    //         </select>
    //       ) : (
    //         <p className="mt-1 text-brand-900">{user.gender}</p>
    //       )}
    //     </div>

    //     {/* Language */}
    //     <div>
    //       <label className="block text-sm font-medium text-gray-700">Language</label>
    //       {isEditing ? (
    //         <select
    //           name="language_preference"
    //           value={form.language_preference || "English"}
    //           onChange={handleChange}
    //           className="mt-1 w-full border p-2 rounded-lg"
    //         >
    //           <option value="English">English</option>
    //           <option value="Nepali">Nepali</option>
    //         </select>
    //       ) : (
    //         <p className="mt-1 text-brand-900">{user.language_preference}</p>
    //       )}
    //     </div>
    //   </div>

    //   {/* Buttons */}
    //   <div className="flex gap-4">
    //     {isEditing ? (
    //       <>
    //       <Button variant="primary" onClick={handleSave}>Save</Button>
    //       <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
    //       </>
    //     ) : (
    //       <Button onClick={(e)=>{e.preventDefault();setIsEditing(true)}}>Edit</Button>
    //     )}
    //   </div>
    // </div>
    <div className="max-w-3xl p-6 space-y-6 ">
      <div className="flex justify-between items-center">
        <header className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            User Profile
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your account settings and preferences
          </p>
        </header>
        <button className="flex items-center gap-2 border border-gray-400 py-2 px-4 rounded-lg hover:bg-red-100 hover:text-red-700 ">
          <LogOut size={20} />
          <span className="font-semibold">logout</span>
        </button>
      </div>
      <div className="bg-white shadow rounded-lg p-4 space-y-6">
        <div className="flex justify-between items-center ">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
            Personal Information
          </h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditing((prev) => !prev);
            }}
            className="bg-brand-400 text-white py-2 px-3 flex justify-center items-center gap-2 rounded-lg hover:bg-brand-500"
          >
            <SquarePen size={20} /> Edit Profile
          </button>
        </div>
        {/* user info and inputs */}
        <div className="flex flex-col gap-6">
          <h3 className="text-base font-semibold">{user.name}</h3>
          <Input
            id="userName"
            label="Full Name"
            placeholder="Full Name"
            register={register}
            error={errors.userName}
            bgColor="white"
            disabled={!isEditing}
          ></Input>

          <div className="flex flex-col">
            <Input
              id="email"
              label="Email"
              register={register}
              error={errors.email}
              bgColor={"white"}
              disabled
              placeholder="a@b.c"
            ></Input>
            <p className="text-gray-400 text-xs mt-1">
              email is not change able.
            </p>
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
          ></Input>
          <div>
            <label className="block text-sm font-medium" htmlFor="gender">
              Gender:
            </label>
            <select
              className={`w-full border p-2 rounded-md bg-white text-brand-950 placeholder:brand-300 focus:outline-none focus:ring-2 transition-colors duration-200 
              ${
                errors.gender
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-brand-300 focus:border-brand-500 focus:ring-brand-200"
              }
              `}
              id="gender"
              {...register("gender")}
              disabled={!isEditing}
            >
              <option>select</option>
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
            <label className="block text-sm font-medium" htmlFor="language_preference">
              Language:
            </label>
            <select
              className={`w-full border p-2 rounded-md bg-white text-brand-950 placeholder:brand-300 focus:outline-none focus:ring-2 transition-colors duration-200 
              ${
                errors.gender
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-brand-300 focus:border-brand-500 focus:ring-brand-200"
              }
              `}
              id="language_preference"
              {...register("language_preference")}
              disabled
            >
              <option>select</option>
              <option value="English">English</option>
              <option value="Nepali">Nepali</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-xs mt-1">
                {"*" + errors.gender.message}
              </p>
            )}
            <p className="text-gray-400 text-xs mt-1">
              Language translation coming soon....
            </p>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="flex items-center gap-2">
      <Button variant="primary" onClick={handleSave} className="sm:w-full">Save</Button>
      <Button variant="secondary" onClick={handleCancel} className="sm:w-full">Cancel</Button>
      </div>)
}
    </div>
  );
}

export default ProfilePage;

