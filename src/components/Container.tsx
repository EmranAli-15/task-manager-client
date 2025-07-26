import "../App.css"


export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-image bg-black/80 h-auto">
            <div className="max-w-3xl mx-auto p-2 md:p-0">
                {children}
            </div>
        </div>
    )
}
