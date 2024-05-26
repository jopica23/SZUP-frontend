import {createContext, useState} from 'react';

export const CurrUserContext = createContext();

// eslint-disable-next-line react/prop-types
export function CurrUserProvider({children}) {
    const [currUser, setCurrUser] = useState(1);

    return (
        <CurrUserContext.Provider value={{currUser, setCurrUser}}>
            {children}
        </CurrUserContext.Provider>
    );
}




