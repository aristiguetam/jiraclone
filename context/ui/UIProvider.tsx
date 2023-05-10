import { FC, useReducer } from 'react';
import { UIContext, UIReducer } from './';

export interface UIState {
     sidemenuOpen: boolean;
     isAddingEntry: boolean;
     isDragging: boolean;
}

export const UI_INITIAL_STATE: UIState = {
     sidemenuOpen: false,
     isAddingEntry: false,
     isDragging: false,
}

interface Props {
     children: JSX.Element
}

export const UIProvider = ({ children }: Props) => {

     const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

     const openSideMenu = () => dispatch({ type: "UI - Open Sidebar" });

     const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' });

     const setIsAddingEntry = (isAdding: boolean) => dispatch({ type: 'UI - Add Entry', payload: isAdding });

     const startDragging = () => dispatch({type: 'UI - Start Dragging'});
     
     const endDragging = () => dispatch({type: 'UI - End Dragging'});

     return (
          <UIContext.Provider value={{
               ...state,
               
               //Methods
               openSideMenu,
               closeSideMenu,

               setIsAddingEntry,
               
               startDragging,
               endDragging,
          }}>
               {children}
          </UIContext.Provider>
     )
}