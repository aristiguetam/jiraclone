import { useRouter } from "next/router";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import { Entry, EntryStatus } from "../interfaces";
import { EntriesContext } from "../context/entries";

export const useUpdateEntry = (entry : Entry) => {
  
    const { updateEntry, deleteEntry } = useContext(EntriesContext)
    
    const router = useRouter()

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const deleteEntryById = () => {
        deleteEntry(entry._id)
        router.push('/')
    }

    const onSave = () => {
        if (inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry(updatedEntry, true);
    }
  
    return {
        status,
        inputValue,
        isNotValid,
        onTextFieldChanges,
        onStatusChanged,
        deleteEntryById,
        onSave,
        setTouched
  }
}
