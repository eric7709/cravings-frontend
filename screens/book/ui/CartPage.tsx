"use client";
import CartList from "./CartList";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import { ConfirmOrderModal } from "./ConfirmOrderModal";
import { useBook } from "../store/useBook";
import { useEffect } from "react";
import { useMenuItemStore } from "@/models/menuItems/store";

export default function CartPage() {
    const { activeModal, items, removeFromCart } = useBook()
    const { menuItems } = useMenuItemStore()

    useEffect(() => {
        if (activeModal == null) {
            items.map(el => {
                const menuItem = menuItems.find(ell => el.menuItemId == ell.id)
                if (menuItem?.status == "UNAVAILABLE") {
                    removeFromCart(menuItem.id)
                }
            })
        }
    }, [activeModal])

    return (
        <div className={`fixed top-0 flex duration-200 flex-col z-500 left-0 w-full  bg-gray-100 ${activeModal == "cart" ? "opacity-100 translate-y-0  overflow-y-auto visible h-dvh" : "invisible h-0 overflow-hidden translate-y-3 opacity-0"}`}>
            <CartHeader />
            <CartList />
            <CartFooter />
            <ConfirmOrderModal />
        </div>
    );
}
