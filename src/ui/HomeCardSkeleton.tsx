import { Skeleton } from "@mui/material";

export default function HomeCardSkeleton() {
    return (
        <div>
            {
                Array(6).fill(null).map((item: any, index: any) => <div  key={index}>
                    <div className="w-full">
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="rectangular" height={60} />
                        <Skeleton variant="rectangular" height={60} />
                        <Skeleton variant="rectangular" height={60} />
                    </div>
                </div>)
            }
        </div>
    )
}
