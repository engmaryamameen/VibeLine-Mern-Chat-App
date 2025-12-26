import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, CheckCircle2 } from "lucide-react";
import { useImageUpload } from "../hooks/useImageUpload";
import Avatar from "../components/Avatar";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const { selectedImg, handleImageUpload } = useImageUpload(async (base64Image) => {
    await updateProfile({ profilePic: base64Image });
  });

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      <div className="w-full max-w-5xl mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600 text-lg">Your profile information</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Avatar Section */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-8 py-12">
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative">
                  <Avatar
                    fullName={authUser?.fullName || ""}
                    profilePic={selectedImg || authUser?.profilePic}
                    size={140}
                    className="ring-4 ring-white shadow-2xl"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-2 right-2 
                      bg-gray-900 hover:bg-gray-800
                      p-3 rounded-full cursor-pointer 
                      transition-all duration-200 shadow-lg
                      hover:scale-110 active:scale-95
                      ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-50" : ""}
                    `}
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 font-medium">
                  {isUpdatingProfile ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span> Uploading...
                    </span>
                  ) : (
                    "Click the camera icon to update your photo"
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8 space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Personal Information
              </h2>

              <div className="space-y-5">
                {/* Full Name Field */}
                <div className="group">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-gray-500" />
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={authUser?.fullName || ""}
                      readOnly
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                               text-gray-900 font-medium
                               focus:outline-none focus:border-primary/50 focus:bg-white
                               transition-all duration-200
                               cursor-default"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={authUser?.email || ""}
                      readOnly
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl
                               text-gray-900 font-medium
                               focus:outline-none focus:border-primary/50 focus:bg-white
                               transition-all duration-200
                               cursor-default"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Account Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Account Information
              </h2>

              <div className="bg-gradient-to-r from-gray-50 to-transparent rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                  <span className="text-gray-600 font-medium">Member Since</span>
                  <span className="text-gray-900 font-semibold">
                    {authUser?.createdAt
                      ? new Date(authUser.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 font-medium">Account Status</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
