import React, {useEffect, useState} from 'react';

export const Context = React.createContext(undefined, undefined);

export const Provider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setOpenState] = useState(false);
    const [typeMessage, setTypeOfMessage] = useState("success")
    const [message, setMessage] = useState("")
    const [timeOut, SetTimeOut] = useState(1500)
    const setState = () => {
        setTimeout(()=> {
            setOpenState(false)
        }, timeOut)
    }

    useEffect( setState, [isOpen])


    return (
        <Context.Provider value={{ loading, setLoading, isOpen,setTypeOfMessage, setOpenState, setMessage, typeMessage, message, SetTimeOut}}>
            {children}
        </Context.Provider>
    );
};
