import { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
    links: string[];
    setLinks: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function LinkInputs({ links, setLinks }: Props) {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const handleChange = (text: string, index: number) => {
        let currentLinks = [...links];
        currentLinks.splice(index, 1, text);
        setLinks(currentLinks);
    };

    const handleDelete = (index: number) => {
        let currentLinks = [...links];
        currentLinks.splice(index, 1);
        setLinks(currentLinks);
    };

    return (
        <div className="space-y-2">
            {links.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input
                        value={link}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(null)}
                        className="h-9 border border-blue-700 outline-0 rounded-sm px-2 flex-1"
                        placeholder="type here"
                    />

                    {focusedIndex === index && (
                        <IconButton
                            color="error"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleDelete(index)}
                            aria-label="delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            ))}
        </div>
    );
}
