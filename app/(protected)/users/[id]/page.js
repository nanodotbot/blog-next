'use client'
import { getBio, getUser } from "@/app/_actions";
import Link from "next/link";
import styles from './page.module.css'
import { useEffect, useState } from "react";

const userInfo = ({ params }) => {
    const [user, setUser] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser(params.id);
            // console.log(fetchedUser);
            if(fetchedUser === null) {
                return;
            }
            const parsedUser = JSON.parse(fetchedUser);
            // console.log('name: ');
            // console.log(parsedUser.name);
            setUser(parsedUser.name);
        };
        fetchUser();
        const fetchBio = async () => {
            const fetchedBio = await getBio(params.id);
            console.log(fetchedBio);
            if(fetchedBio === null) {
                return;
            }
            const parsedBio = JSON.parse(fetchedBio);
            setBio(parsedBio.bio);
        }
        fetchBio();
    }, [])

    return (
        <div className={styles.wrapper}>
            <h1>{user}</h1>
            <p>{bio}</p>
            <Link href="../../blog/">Zurück zum Blog</Link>
        </div>
    )
}

export default userInfo