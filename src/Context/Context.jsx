import React, { createContext, useEffect, useState } from 'react'


export let UserContext = createContext();


export default function ContextProvider({ children }) {
    
    const [UserToken, setUserToken] = useState('');
    useEffect(()=>{ // handel reload
        if(localStorage.getItem('UserToken')){
            setUserToken(localStorage.getItem('UserToken'));
        }
    },[])


    return (
        <>
            <UserContext.Provider value={ {UserToken, setUserToken} }>

                {children}

            </UserContext.Provider>
        </>
    )
}
