
export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-3xl mx-auto p-2 md:p-0 my-1">
            {children}
        </div>
    )
}
