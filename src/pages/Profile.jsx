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
  const unlockedBadgesRef = useRef([]);

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

      // Check for newly unlocked badges
      const newlyUnlocked = allBadges.filter(
        (b) =>
          b.condition(profile) && !unlockedBadgesRef.current.includes(b.id)
      );

      newlyUnlocked.forEach((badge) => {
        toast.success(`🎉 You unlocked "${badge.name}"!`);
      });

      unlockedBadgesRef.current = allBadges
        .filter((b) => b.condition(profile))
        .map((b) => b.id);
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
                src={avatar || "/avatar.png"}
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

            <div className="mt-6 flex items-center gap-2">
              <h2 className="text-2xl font-bold">
                {profile?.name || "Complete your profile"}
              </h2>
              <button
                onClick={() => setModalOpen(true)}
                className="text-slate-400 hover:text-emerald-600 p-1 rounded-full hover:bg-slate-100"
                title="Edit profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                </svg>
              </button>
            </div>

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
            {/* You can add stats here */}
          </div>

          {/* Impact Heatmap */}
          <ImpactHeatmap />

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              Achievements
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
              {allBadges.map((badge) => {
                const unlocked = badge.condition(profile);
                let progress = 0;

                if (badge.id === "co2_100") {
                  const co2Saved = Object.values(profile?.heatmapCo2 || {}).reduce(
                    (sum, v) => sum + v,
                    0
                  );
                  progress = Math.min((co2Saved / 100) * 100, 100);
                }

                return (
                  <div
                    key={badge.id}
                    className={`flex flex-col items-center gap-2 ${
                      unlocked ? "" : "opacity-30"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
                        unlocked ? badge.color : "bg-slate-200"
                      }`}
                    >
                      {badge.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 text-center uppercase tracking-wider">
                      {badge.name}
                    </span>
                    {!unlocked && badge.id === "co2_100" && (
                      <div className="w-full h-1 bg-slate-200 rounded mt-1">
                        <div
                          className="h-1 bg-emerald-500 rounded"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
