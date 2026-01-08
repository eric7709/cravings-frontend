"use client";

import { motion } from "framer-motion";
import { useUserStore } from "@/models/auth/store";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileSidebar } from "./ProfileSideBar";
import { ContactInformation } from "./ContactInformation";
import { AccountDetails } from "./AccountDetails";
import ChangePasswordForm from "@/screens/auth/ui/ChangePasswordForm";

export default function ProfilePage() {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50"
      initial={{ opacity: 0, y:10 }}
      animate={{ opacity: 1, y:0 }}
      exit={{ opacity: 0 , y:10}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <ProfileBanner role={user.role as string} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-36">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileSidebar />

          <div className="lg:col-span-2 space-y-6">
            <ContactInformation user={user} />
            <AccountDetails />
          </div>
        </div>
      </div>

      <ChangePasswordForm />
    </motion.div>
  );
}
