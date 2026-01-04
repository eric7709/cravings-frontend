"use client"
import MobileHeader from './MobileHeader';
import AdminOrderHeader from './AdminOrderHeader';

export default function Header() {
    return (
        <div className="bg-white z-40  relative px-4 py-3 border-b border-gray-100 ">
            <AdminOrderHeader />
            <MobileHeader />
        </div>
    )
}
