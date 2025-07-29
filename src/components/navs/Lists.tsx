import { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import "../../App.css"

type Props = {
    lists: string[];
    setLists: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ListsInputs({ lists, setLists }: Props) {

    // LINKS RELATED ACTIONS------------------
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const handleChange = (text: string, index: number) => {
        let currentLists = [...lists];
        currentLists.splice(index, 1, text);
        setLists(currentLists);
    };

    const handleDelete = (index: number) => {
        let currentLists = [...lists];
        currentLists.splice(index, 1);
        setLists(currentLists);
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

        const updated = [...lists];
        [updated[dragIndex], updated[dropIndex]] = [updated[dropIndex], updated[dragIndex]];
        setLists(updated);
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
            {lists.map((list, index) => (
                <div key={index} className="flex items-center gap-y-2">
                    <div
                        className={`${dragStart && index == dragIndex && 'w-20 p-0'}
                        ${dragStart && index == dragHoverIndex && 'w-20 p-0'}
                        cursor-pointer relative -ml-[7px]
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
                        value={list}
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
