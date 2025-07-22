import { createContext, useContext, useEffect, useState } from 'react';

type TDataInfo = {
    user: any | null,
    loading: boolean,
    setUser: (user: string | null) => void;
    setLoading: (loading: boolean) => void;
}

export const ContextProvider = createContext<TDataInfo | null>(null);


export const MyProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const data = JSON.parse(token);
            setUser(data)
        }
        setLoading(false);
    }, [loading]);


    const dataInfo = {
        user,
        setUser,
        loading,
        setLoading
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