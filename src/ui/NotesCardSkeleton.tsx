import PushPinIcon from '@mui/icons-material/PushPin';
export default function NotesCardSkeleton() {
    return (
        <div className='grid md:grid-cols-3 gap-2'>
            {
                Array(6).fill(null).map((item: any, index: any) => (
                    <div
                        key={index}
                        className='text-white bg-slate-800 rounded-[30px] noteCardShadow h-60 animate-pulse'>
                        <div className='bg-slate-700 p-4 rounded-t-[20px] flex items-center justify-between'>
                            <div>
                                <p className='text-slate-800 bg-slate-800 rounded w-10 h-2'></p>
                                <p className='text-slate-800 bg-slate-800 rounded w-20 h-2 my-1'></p>
                                <p className='text-slate-800 bg-slate-800 rounded w-32 h-2'></p>
                            </div>
                            <div>
                                <PushPinIcon className='text-slate-400 rotate-25'></PushPinIcon>
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='text-slate-300 font-medium text-lg line-clamp-1'>
                                <p className='bg-slate-700 rounded w-full h-2 my-1'></p>
                            </div>
                            <div className='mt-5 text-slate-400 line-clamp-3'>
                                <p className='bg-slate-700 rounded w-full h-1 my-1'></p>
                                <p className='bg-slate-700 rounded w-full h-1 my-1'></p>
                                <p className='bg-slate-700 rounded w-full h-1 my-1'></p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
