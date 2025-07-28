import { Button } from "@mui/material";
import { useState } from "react";

export default function Test() {
    const [links, setLinks] = useState<string[]>([])
    const handle = () => {
        let newLinks = [...links, ""]
        setLinks(newLinks);
    }

    const data = (txt: string, index: number) => {
        let currentLinks = [...links];
        currentLinks.splice(index, 1, txt);
        setLinks(currentLinks);
    }

    return (
        <div className='max-w-5xl mx-auto p-5'>

            <div className="my-10">
                {
                    links.map((link, index) => (
                        <div key={index}>
                            {
                                <input
                                    onChange={(e) => data(e.target.value, index)}
                                    value={link}
                                    className="h-9 border border-blue-700 outline-0 rounded-sm px-2 mt-2"
                                    type="text"
                                    placeholder="type here"
                                />
                            }
                        </div>
                    ))
                }
            </div>

            <Button onClick={handle} variant="outlined">CLICK</Button>
        </div>
    )
}
