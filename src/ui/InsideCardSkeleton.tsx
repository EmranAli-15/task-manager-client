import Container from "../components/Container";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export default function InsideCardSkeleton() {
    return (
        <Container>
            <div>
                <nav className="flex items-center overflow-auto gap-x-2 pt-1 animate-pulse">
                    <div><button className="bg-slate-700 text-slate-700 h-9 rounded-sm border-0 w-28"></button></div>
                    <div><button className="bg-slate-700 text-slate-700 h-9 rounded-sm border-0 w-24"></button></div>
                    <div><button className="bg-slate-700 text-slate-700 h-9 rounded-sm border-0 w-28"></button></div>
                    <div><button className="bg-slate-700 text-slate-700 h-9 rounded-sm border-0 w-20"></button></div>
                    <div><button className="bg-slate-700 text-slate-700 h-9 rounded-sm border-0 w-28"></button></div>
                    <div><button className="bg-slate-700 text-slate-700 h-9 rounded-sm border-0 w-32"></button></div>
                    <div><button className="bg-slate-700 text-slate-700 h-9 rounded-sm border-0 w-28"></button></div>
                    <div><button className="bg-slate-700 text-slate-700 h-9 rounded-sm border-0 w-28"></button></div>
                </nav>

                <div className="mt-5">
                    <div className="flex items-center gap-x-2 animate-pulse">
                        <DragIndicatorIcon className="text-white!"></DragIndicatorIcon>
                        <p className="h-8 rounded-sm bg-slate-600 w-full"></p>
                    </div>
                    <div className="flex items-center gap-x-2 animate-pulse my-1">
                        <DragIndicatorIcon className="text-white!"></DragIndicatorIcon>
                        <p className="h-8 rounded-sm bg-slate-600 w-full"></p>
                    </div>
                    <div className="flex items-center gap-x-2 animate-pulse">
                        <DragIndicatorIcon className="text-white!"></DragIndicatorIcon>
                        <p className="h-8 rounded-sm bg-slate-600 w-full"></p>
                    </div>
                </div>

                <div className="mt-5">
                    <p className="h-16 rounded-sm bg-slate-600 animate-pulse"></p>
                </div>

                <div className="mt-7">
                    <p className="h-[400px] rounded-sm bg-slate-700 animate-pulse"></p>
                </div>
            </div>
        </Container>
    )
}
