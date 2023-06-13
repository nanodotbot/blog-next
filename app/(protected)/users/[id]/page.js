'use client'
import { useEffect, useState } from "react";

const users = [
    {
        id: 1,
        name: 'Algernon'
    },
    {
        id: 2,
        name: 'Floppy'
    }
]

const userInfo = ({ params }) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        setUser(users.filter(user => user.id == params.id));
    }, [])

    return (
        <>
            <p>{params.id}</p>
            <p>id: {user[0]?.id}</p>
            <p>name: {user[0]?.name}</p>
        </>
    )
}

export default userInfo