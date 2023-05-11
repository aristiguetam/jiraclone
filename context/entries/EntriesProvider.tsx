import { useEffect, useReducer } from 'react';

import { useSnackbar } from 'notistack';

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../apis';

export interface EntriesState {
     entries: Entry[];
}

export const Entries_INITIAL_STATE: EntriesState = {
     entries: [],
}

interface Props {
     children: JSX.Element
}

export const EntriesProvider = ({ children }: Props) => {

     const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
     const { enqueueSnackbar } = useSnackbar()

     const addNewEntry = async (description: string) => {

          const { data } = await entriesApi.post<Entry>('/entries', { description });
          dispatch({ type: '[Entry] - Add-Entry', payload: data });

     }

     const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {

          try {
               const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
               dispatch({ type: '[Entry] - Entry-Update', payload: data })

               if (showSnackbar) {
                    enqueueSnackbar('Entrada actualizada', {
                         variant: 'success',
                         autoHideDuration: 1500,
                         anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'right'
                         }
                    })
               }

          } catch (error) {
               console.log({ error })
          }
     }

     const refreshEntries = async () => {
          const { data } = await entriesApi.get<Entry[]>('/entries');
          dispatch({ type: '[Entry] - Refresh-Data', payload: data });
     }

     const deleteEntry = async ( _id : string) => {
          try {
               const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);
               dispatch({ type: '[Entry] - Delete-Entry', payload: data._id })

                    enqueueSnackbar('Entrada Eliminada', {
                         variant: 'error',
                         autoHideDuration: 1500,
                         anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'right'
                         }
                    })

          } catch (error) {
               console.log({ error })
          }
     }
     useEffect(() => {
          refreshEntries();
     }, [])

     return (
          <EntriesContext.Provider value={{
               ...state,
               addNewEntry,
               updateEntry,
               deleteEntry,
          }}>
               {children}
          </EntriesContext.Provider>
     )
}

