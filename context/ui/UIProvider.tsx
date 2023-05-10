import { FC, useReducer } from 'react';
import { UIContext, UIReducer } from './';

export interface UIState {
     sidemenuOpen: boolean;
}

export const UI_INITIAL_STATE: UIState = {
     sidemenuOpen: false
}

interface Props {
     children: JSX.Element
}

export const UIProvider = ({ children }: Props) => {

     const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

     const openSideMenu = () => dispatch({ type: "UI - Open Sidebar" });
     
     const closeSideMenu = () => dispatch({type: 'UI - Close Sidebar'})
     

     return (
          <UIContext.Provider value={{
               ...state,
               openSideMenu,
               closeSideMenu,
          }}>
               {children}
          </UIContext.Provider>
     )
}