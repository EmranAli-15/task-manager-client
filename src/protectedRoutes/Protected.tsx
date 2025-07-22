import React from 'react'
import { useMyProvider } from '../contextApi/ContextApi'
import { Navigate } from 'react-router';

export default function Protected({ children }: { children: React.ReactNode }) {

    const { user } = useMyProvider();

    if (!user) return <Navigate to="/login" replace></Navigate >
    else return children
}



export function Locked({ children }: { children: React.ReactNode }) {

    const {user} = useMyProvider();

    if (user) return <Navigate to="/" replace></Navigate >
    else return children
}
