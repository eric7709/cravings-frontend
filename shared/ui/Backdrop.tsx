type Props = {
    modalOpened: boolean
    closeModal: () => void
    children: React.ReactNode
}
export default function Backdrop({ closeModal, modalOpened, children }: Props) {
    return (
        <div className={`h-screen z-[1000000] fixed left-0 duration-300 bg-blue-300/50 w-full grid place-content-center top-0 ${modalOpened ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div onClick={closeModal} className="h-full w-full bg-black/50 backdrop-blur absolute top-0 left-0 z-10"></div>
            <div className={`relative z-30 ${modalOpened ? "opacity-100" : "opacity-0"}`}>
                {children}
            </div>
        </div>
    )
}
