import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

type TDataInfo = {
    user: any | null,
    loading: boolean,
    tokenLoading: boolean,
    setUser: (user: string | null) => void;
    setLoading: (loading: boolean) => void;
    setTokenLoading: (loading: boolean) => void;
}

export const ContextProvider = createContext<TDataInfo | null>(null);


export const MyProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const data = JSON.parse(token);
            const decoded = jwtDecode(data);
            setUser(decoded)
        }
        setLoading(false);
        setTokenLoading(false);
    }, [loading]);


    const dataInfo = {
        user,
        setUser,
        loading,
        setLoading,
        tokenLoading,
        setTokenLoading
    };


    return (
        <ContextProvider.Provider value={dataInfo}>
            {children}
        </ContextProvider.Provider>
    )
};

export const useMyProvider = () => {
    const context = useContext(ContextProvider);

    if (!context) throw new Error("useMyProvider must be used within a ContextProvider");
    return context;
}