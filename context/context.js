import React, {useCallback, useState} from 'react';

export const Context = React.createContext();

export const Provider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <Context.Provider value={{ loading, setLoading }}>
            {children}
        </Context.Provider>
    );
};
