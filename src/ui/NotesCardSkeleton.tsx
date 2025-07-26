import { Skeleton } from '@mui/material'

export default function NotesCardSkeleton() {
    return (
        <div className='grid md:grid-cols-3 gap-2 py-5'>
            {
                Array(6).fill(null).map((item: any, index: any) => (
                    <div className="w-full flex flex-col" key={index}>
                        <Skeleton variant="rectangular" className="bg-slate-700!" height={30} />
                        <Skeleton variant="rectangular" className="bg-gray-800!" height={180} />
                    </div>
                ))
            }
        </div>
    )
}
