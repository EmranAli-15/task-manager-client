import { Button } from "@mui/material";
import ColorLensIcon from '@mui/icons-material/ColorLens';

export default function Color({ openColor, setOpenColor, color, setColor }: { openColor: boolean, setOpenColor: Function, color: any, setColor: Function }) {

    const handleColorCode = (color: string) => {
        if (color == 'yellow') {
            setColor({ header: "#ffdf20", body: "#fff085" })
        }
        else if (color == 'green') {
            setColor({ header: "#05df72", body: "#7bf1a8" })
        }
        else if (color == 'red') {
            setColor({ header: "#ff6467", body: "#ffa2a2" })
        }
        else if (color == 'white') {
            setColor({ header: "#fff", body: "#e2e8f0" })
        }
        else {
            setColor({ header: "#314158", body: "#1d293d" })
        }
        setOpenColor(false);
    }

    return (
        <div className="relative">
            <Button
                onClick={() => setOpenColor(!openColor)}
                variant="outlined"
                className='text-slate-400! normal-case!'
                endIcon={<ColorLensIcon style={{ color: color.header }}></ColorLensIcon>}>
                Color
            </Button>
            {
                openColor && <div className="top-14 left-1/2 -translate-x-1/2 fixed w-20">
                    <div onClick={() => handleColorCode("yellow")} className="bg-yellow-300 w-full h-7 cursor-pointer"></div>
                    <div onClick={() => handleColorCode("green")} className="bg-green-400 w-full h-7 cursor-pointer"></div>
                    <div onClick={() => handleColorCode("red")} className="bg-red-400 w-full h-7 cursor-pointer"></div>
                    <div onClick={() => handleColorCode("white")} className="bg-white w-full h-7 cursor-pointer"></div>
                    <div onClick={() => handleColorCode("slate")} className="bg-slate-700 w-full h-7 cursor-pointer"></div>
                </div>
            }
        </div>
    )
}
