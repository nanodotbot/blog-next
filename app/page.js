'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Toggle from './components/Toggle'
import { handleRegister } from './_actions'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, redirect } from 'next/navigation'


export default function Home() {
    const { data: session } = useSession();

    const [inputType, setInputType] = useState('password');
    const [register, setRegister] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [feedbackStatus, setFeedbackStatus] = useState('');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleTabLogin = () => {
        setRegister(false);
        setFeedback('');
        setFeedbackStatus('');
    }
    const handleTabRegister = () => {
        setRegister(true);
        setFeedback('');
        setFeedbackStatus('');
    }

    const showPassword = () => inputType === 'password' ? setInputType('text') : setInputType('password');

    const action = async () => {
        // console.log('action');
        setFeedback('Du wirst eingeloggt.');
        setFeedbackStatus('');
        if (register) {
            if (!username || !password) {
                setFeedbackStatus('error');
                setFeedback('Benutzername und Passwort sind Pflicht.');
                return;
            }
            const result = await handleRegister(username, email, password);
            const message = JSON.parse(result).message;
            message === 'Benutzername ist bereits vergeben.' ? setFeedbackStatus('error') : message === 'Benutzerkonto wurde erfolgreich erstellt.' ? setFeedbackStatus('success') : setFeedbackStatus('');
            setFeedback(JSON.parse(result).message);
            return;
        }
        if (!username || !password) {
            setFeedbackStatus('error');
            setFeedback('Bitte Benutzername und Passwort eingeben.');
            return;
        }
        // console.log('call signin with ' + username, password);
        const result = await signIn('credentials', {
            username,
            password,
            redirect: false
        })
        // console.log('signin result');
        // console.log(result);
        if (result.error) {
            // console.log(result.error);
            setFeedbackStatus('error');
            if (result.error === "CredentialsSignin") {
                setFeedback("Falscher Benutzername oder Passwort");
                return;
            }
            setFeedback("Der Login ist aus unbekannten Gründen fehlgeschlagen.")
        }
    }

    return (
        <>
            {session?.user ? redirect('/blog') : (
                <main className={styles.main}>

                    <Image className={styles.img} src={'/logo.png'} width={100} height={100} alt="logo" priority />

                    <header className={styles.tabs}>
                        <button id='tab-login' className={register ? 'tab' : 'tab active'} onClick={handleTabLogin}>Anmelden</button>
                        <button id='tab-register' className={register ? 'tab active' : 'tab'} onClick={handleTabRegister}>Registrieren</button>
                    </header>

                    <form className={styles.form} action={action}>

                        <div className={styles.inputWrapper}>
                            <label htmlFor='username'>Nutzername</label>
                            <input type="text" name='username' id='username' value={username} onChange={e => setUsername(e.target.value)} autoFocus />
                        </div>
                        {register &&
                            <div className={styles.inputWrapper}>
                                <label htmlFor='email'>E-Mail (optional)</label>
                                <input type="text" name='email' id='email' onChange={e => setEmail(e.target.value)} />
                            </div>
                        }
                        <div className={styles.inputWrapper}>
                            <label htmlFor='password'>Passwort</label>
                            <input type={inputType} name='password' id='password' onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className={styles.showPassword}>
                            <p>Passwort anzeigen</p> <Toggle handleToggle={showPassword} />
                        </div>

                        {!register && <button className={styles.button}>Anmelden</button>}
                        {register && <button className={styles.button}>Registrieren</button>}

                    </form>

                    <p className={feedbackStatus === 'success' ? 'feedback success' : feedbackStatus === 'error' ? 'feedback error' : 'feedback'}>{feedback}&nbsp;</p>
                </main>
            )}
        </>

    )
}
