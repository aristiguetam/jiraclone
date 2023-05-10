import { useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
     entries: Entry[];
}

export const Entries_INITIAL_STATE: EntriesState = {
     entries: [
          {
               _id: uuidv4(),
               description: ' Pendiente: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non velit metus.',
               status: 'pending',
               createdAt: Date.now(),
          },
          {
               _id: uuidv4(),
               description: ' En progreso: Sed vel est ut urna mollis lobortis sit amet volutpat dui. Phasellus sit amet leo efficitur,',
               status: 'in-progress',
               createdAt: Date.now() - 1000000,
          },
          {
               _id: uuidv4(),
               description: 'Terminadas: Nunc commodo nisl mauris. Cras commodo sollicitudin nunc ac accumsan. Donec tempus lacinia semper.',
               status: 'finished',
               createdAt: Date.now() - 100000,
          },
     ],
}

interface Props {
     children: JSX.Element
}

export const EntriesProvider = ({ children }: Props) => {

     const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

     return (
          <EntriesContext.Provider value={{
               ...state
          }}>
               {children}
          </EntriesContext.Provider>
     )
}

