"use client"
import AdminHeader from '@/models/admin/ui/AdminHeader';
import AdminHeaderMobile from '@/models/admin/ui/AdminHeaderMobile';
import AdminMobileDropdown from '@/models/admin/ui/AdminMobileDropdown';
import AdminMobileSideBar from '@/models/admin/ui/AdminMobileSideBar';
import Sidebar from '@/shared/ui/Sidebar';

// AdminLayout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {


    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white">
                <AdminHeader />
                <AdminHeaderMobile />
                <AdminMobileDropdown />
                <AdminMobileSideBar />
                <div className=" h-[calc(100dvh-64px)] lg:h-[calc(100dvh-90px)] bg-gray-50 flex flex-col custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
}
