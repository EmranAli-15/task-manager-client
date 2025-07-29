import "../App.css"


export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-image bg-black/80 h-auto">
            <div className="max-w-3xl mx-auto px-2 md:px-0">
                {children}
            </div>
        </div>
    )
}
