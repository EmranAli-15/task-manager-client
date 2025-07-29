import { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import "../../App.css"

type Props = {
    links: string[];
    setLinks: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function LinkInputs({ links, setLinks }: Props) {

    // LINKS RELATED ACTIONS------------------
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




    // DRAGGABLE RELATED ACTIONS-------------------
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dragStart, setDragStart] = useState(false);
    const [dragHoverIndex, setHoverDragIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDragIndex(index);
        setDragStart(true);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setHoverDragIndex(index);
    };

    const handleDrop = (dropIndex: number) => {
        if (dragIndex === null || dragIndex === dropIndex) return;

        const updated = [...links];
        [updated[dragIndex], updated[dropIndex]] = [updated[dropIndex], updated[dragIndex]];
        setLinks(updated);
        setDragIndex(null);
        setDragStart(false);
        setHoverDragIndex(null)
    };

    const mouseLeave = () => {
        setDragIndex(null)
        setDragStart(false);
        setHoverDragIndex(null)
    }

    return (
        <div className="space-y-2 max-h-[375px] overflow-auto">
            {links.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div
                        className={`${dragStart && index == dragIndex && 'w-20 p-0'}
                        ${dragStart && index == dragHoverIndex && 'w-20 p-0'}
                        cursor-pointer
                        `}
                        draggable
                        onMouseLeave={mouseLeave}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragStart={() => handleDragStart(index)}
                        onDrop={() => handleDrop(index)}
                    >
                        <DragIndicatorIcon
                        ></DragIndicatorIcon>
                    </div>
                    <input
                        value={link}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(null)}
                        className={`${dragStart && index == dragIndex && 'drag-shaking bg-red-400'}
                        ${dragStart && index == dragHoverIndex && 'drag-shaking bg-green-400'}
                        h-9 border-0 outline-0 rounded-sm px-2 flex-1`}
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
