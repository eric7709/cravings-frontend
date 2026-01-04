"use client"
import AdminHeader from '@/models/admin/ui/AdminHeader';
import Blocker from '@/shared/provider/Blocker';
import Sidebar from '@/shared/ui/Sidebar';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Blocker>
            <div className={`grid h-screen lg:grid-cols-[auto_1fr] duration-500 `}>
                <Sidebar />
                <div className="flex h-screen overflow-y-auto border-l border-white flex-col">
                    <AdminHeader />
                    <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
                </div>
            </div>
        </Blocker>
    )
}
