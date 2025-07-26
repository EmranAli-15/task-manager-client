import { Skeleton } from "@mui/material";

export default function HomeCardSkeleton() {
    return (
        <div className='grid md:grid-cols-3 gap-2 py-5'>
            {
                Array(6).fill(null).map((item: any, index: any) => (
                    <div className="w-full flex flex-col animate-pulse" key={index}>
                        <div className="bg-gray-700 h-[60px] flex items-center justify-center">
                            <p className="bg-gray-800 w-[80%] h-2 rounded"></p>
                        </div>
                        <Skeleton variant="rectangular" className="bg-slate-800!" height={180} />
                    </div>
                ))
            }
        </div>
    )
}
