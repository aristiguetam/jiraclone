import { DragEvent, useContext, useMemo } from "react";

import { List, Paper } from "@mui/material"

import { UIContext } from "../../context/ui";
import { EntriesContext } from "../../context/entries";

import { EntryCard } from "./EntryCard"
import { EntryStatus } from "../../interfaces"

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList = ({ status }: Props) => {

    const { entries, updateEntry } = useContext(EntriesContext)
    const { isDragging, endDragging } = useContext(UIContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find(e => e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    }

    return (
        <div
            className={isDragging ? styles.dragging : ''}
            onDrop={onDropEntry}
            onDragOver={allowDrop}
        >
            <Paper sx={{ height: 'calc(100vh - 250px)', backgroundColor: 'transparent', padding: "3px 5px" }}>


                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map(entry => (

                            <EntryCard key={entry._id} entry={entry} />

                        ))
                    }
                </List>

            </Paper>

        </div>
    )
}
