import React, { useRef, useState, useEffect } from "react";
import { ProfileHeader } from "../components/ProfileHeader";
import { ImpactHeatmap } from "../components/ImpactHeatmap";
import { useFirebase } from "../context/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileModal } from "../components/ProfileModal";
import { badges as allBadges } from "../data/badges";

const Profile = () => {
  const { user, profile, updateProfile, loading } = useFirebase();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(profile?.avatar || "");
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      const complete =
        profile &&
        profile.name?.trim() &&
        profile.location?.trim();

      setIsProfileComplete(complete);

      if (!complete) {
        toast.info(
          "Your profile is incomplete. Click the avatar or button to complete it.",
          { autoClose: false }
        );
      }

      setAvatar(profile?.avatar || "");
    }
  }, [loading, profile]);

  if (loading) return null;

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const img = ev.target.result;
      setAvatar(img);
      await updateProfile(user.uid, { avatar: img });
      setIsProfileComplete(true);
      toast.success("Profile updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (data) => {
    await updateProfile(user.uid, data);
    setAvatar(data.avatar || avatar);
    setIsProfileComplete(true);
    toast.success("Profile updated!");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ProfileHeader />
      <ToastContainer position="top-right" />
      <ProfileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProfile}
        profile={profile}
      />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-8">
          {/* Avatar Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border flex flex-col items-center text-center">
            <div
              onClick={handleFileClick}
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500 cursor-pointer"
            >
              <img
                src={avatar || "https://picsum.photos/200"}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            <h2 className="mt-6 text-2xl font-bold">
              {profile?.name || "Complete your profile"}
            </h2>

            {!isProfileComplete && (
              <button
                onClick={() => setModalOpen(true)}
                className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Complete Your Profile
              </button>
            )}

            <p className="text-slate-500">{user.email}</p>
            <p className="text-sm text-emerald-600 mt-2">
              Joined {profile?.memberSince || "–"}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* ... same as before, use isProfileComplete */}
          </div>

          {/* Impact Heatmap */}
          <ImpactHeatmap />

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              Achievements
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
              {isProfileComplete ? (
                allBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${badge.color}`}
                    >
                      {badge.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 text-center uppercase tracking-wider">
                      {badge.name}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 col-span-full text-center">
                  Complete your profile to see your achievements
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
