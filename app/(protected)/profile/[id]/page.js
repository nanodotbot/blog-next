'use client'
import { createBio, getBio, getUser, updateBio, updatePassword } from "@/app/_actions";
import Link from "next/link";
import styles from './page.module.css'
import { useEffect, useState } from "react";
import Textarea from "@/app/components/Textarea";
import Toggle from "@/app/components/Toggle";
import { useSession } from "next-auth/react";

const profile = ({ params }) => {
    const {data: session} = useSession();

    const [user, setUser] = useState('');
    const [bio, setBio] = useState('');
    const [bioInitialState, setBioInitialState] = useState(false);
    const [password, setPassword] = useState('');
    const [inputType, setInputType] = useState('password');

    const [updatedBio, setUpdatedBio] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [bioFeedback, setBioFeedback] = useState('');
    const [passwordFeedback, setPasswordFeedback] = useState('');
    const [feedbackStatus, setFeedbackStatus] = useState('');

    const fetchUser = async () => {
        const fetchedUser = await getUser(params.id);
        // console.log(fetchedUser);
        if (fetchedUser === null) {
            return;
        }
        const parsedUser = JSON.parse(fetchedUser);
        // console.log('name: ');
        // console.log(parsedUser.name);
        setUser(parsedUser.name);
    };
    const fetchBio = async () => {
        const fetchedBio = await getBio(params.id);
        // console.log(fetchedBio);
        if (fetchedBio === null) {
            setBioInitialState(false);
            return;
        }
        setBioInitialState(true);
        const parsedBio = JSON.parse(fetchedBio);
        setBio(parsedBio.bio);
    }

    const handleTextareaInput = e => {
        setBio(e.target.value);
    }
    const showPassword = () => inputType === 'password' ? setInputType('text') : setInputType('password');

    const saveDescription = async () => {
        // console.log(session?.user.id);

        if(bioInitialState === false) {
            console.log(bio);
            await createBio(session?.user.id, bio).then(result => {
                console.log(result);
                console.log(result.id);
                if(result.id){
                    setPasswordFeedback('');
                    setFeedbackStatus('success');
                    setBioFeedback('Beschreibung erfolgreich gespeichert.');
                    return;
                }
                setFeedbackStatus('error');
                setBioFeedback('Irgendetwas hat nicht geklappt.');    
            })
            return;
        }

        await updateBio(session?.user.id, bio).then(result => {
            console.log(result);
            console.log(result.id);
            if(result.id){
                setPasswordFeedback('');
                setFeedbackStatus('success');
                setBioFeedback('Beschreibung erfolgreich gespeichert.');
                return;
            }
            setFeedbackStatus('error');
            setBioFeedback('Irgendetwas hat nicht geklappt.');
        });
    }
    const savePassword = async () => {
        // console.log(password);
        // console.log(session?.user.id);
        
        await updatePassword(session?.user.id, password).then(result => {
            // console.log(result);
            if(result.id) {
                setBioFeedback('');
                setFeedbackStatus('success');
                setPasswordFeedback('Passwort erfolgreich gespeichert.');
                return;
            }
            setFeedbackStatus('error');
            setPasswordFeedback('Irgendetwas hat nicht geklappt.');
        });
    }

    useEffect(() => {
        fetchUser();
        fetchBio();
    }, [])
    useEffect(() => {
        fetchBio();
    }, [updatedBio])
    useEffect(() => {
        fetchUser();
    }, [updatedPassword])

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{user}</h1>
            <Textarea handleTextareaInput={e => handleTextareaInput(e)} message={bio} label='Deine Beschreibung' />
            <button onClick={saveDescription}>Beschreibung speichern</button>
            <p className={feedbackStatus === 'success' ? 'feedback success' : feedbackStatus === 'error' ? 'feedback error' : 'feedback'}>{bioFeedback}</p>
            <label htmlFor="newpassword">Neues Passwort</label>
            <input type={inputType} value={password} onChange={e => setPassword(e.target.value)} id="newpassword" />
            <div className={styles.showPassword}>
                <p>Passwort anzeigen</p> <Toggle handleToggle={showPassword} />
            </div>
            <button onClick={savePassword}>Neues Passwort speichern</button>
            <p className={feedbackStatus === 'success' ? 'feedback success' : feedbackStatus === 'error' ? 'feedback error' : 'feedback'}>{passwordFeedback}</p>
            <Link href="../../blog/">Zurück zum Blog</Link>
        </div>
    )
}

export default profile