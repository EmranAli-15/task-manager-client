import { Skeleton } from "@mui/material";

export default function HomeCardSkeleton() {
    return (
        <div className='grid md:grid-cols-3 gap-2 mt-5'>
            {
                Array(6).fill(null).map((item: any, index: any) => (
                    <div className="w-full flex flex-col gap-y-1" key={index}>
                        <Skeleton variant="rectangular" className="bg-slate-100" height={30} />
                        <Skeleton variant="rectangular" className="bg-slate-100" height={180} />
                    </div>
                ))
            }
        </div>
    )
}
