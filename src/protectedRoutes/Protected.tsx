import React from 'react'
import { useMyProvider } from '../contextApi/ContextApi'
import { Navigate } from 'react-router';
import Container from '../components/Container';

export default function Protected({ children }: { children: React.ReactNode }) {

    const { user, tokenLoading } = useMyProvider();

    if (tokenLoading) return <Container><p>wait a moment...</p></Container>
    else if (!user) return <Navigate to="/login" replace></Navigate >
    else return children
}



export function Locked({ children }: { children: React.ReactNode }) {

    const { user, tokenLoading } = useMyProvider();

    if (tokenLoading) return <Container><p>wait a moment...</p></Container>
    else if (user) return <Navigate to="/" replace></Navigate >
    else return children
}
