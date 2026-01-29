'use client'
import { UserProvider } from "@/shared/provider/UserProvider";
import RealTimeProvider from "@/shared/provider/RealtimeProvider";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <RealTimeProvider>
          {children}
      </RealTimeProvider>
    </UserProvider>
  );
}