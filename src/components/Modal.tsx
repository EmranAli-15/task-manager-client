
export default function Modal({ modal, setModal, children }: { modal: boolean, setModal: Function, children: any }) {
    return (
        <>
            {
                modal && <div>
                    <div onClick={() => setModal(false)} className="h-[100vh] w-[100vw] bg-black/80 absolute z-10 left-0 right-0 top-0 bottom-0"></div>
                    <div className="z-50 absolute left-[50%] -translate-x-1/2 top-20">
                        {
                            children
                        }
                    </div>
                </div>
            }
        </>
    )
}
