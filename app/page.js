'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from './page.module.css'
import Toggle from './components/Toggle'

export default function Home() {
    const [inputType, setInputType] = useState('password');
    const [register, setRegister] = useState(false);
    const [feedback, setFeedback] = useState('');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleTabLogin = () => {
        setRegister(false);
    }
    const handleTabRegister = () => {
        setRegister(true);
    }

    const handleLogin = e => {
        e.preventDefault();
        console.log('miau');
    }
    const handleRegister = e => {
        e.preventDefault();
        console.log('miau');
    }

    const showPassword = () => inputType === 'password' ? setInputType('text') : setInputType('password');

    return (
        <main className={styles.main}>
            <Image className={styles.img} src={'/logo.png'} width={100} height={100} alt="logo" priority />
            <header className={styles.tabs}>
                <button id='tab-login' className={register ? 'tab' : 'tab active'} onClick={handleTabLogin}>Anmelden</button>
                <button id='tab-register' className={register ? 'tab active' : 'tab'} onClick={handleTabRegister}>Registrieren</button>
            </header>
            <form className={styles.form}>
                <div className={styles.inputWrapper}>
                    <label htmlFor='username'>Nutzername</label>
                    <input type="text" name='username' id='username' value={username} onChange={e => setUsername(e.target.value)} autoFocus />
                </div>
                {   register &&
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
                {!register && <button className={styles.button} onClick={e => handleLogin(e)}>Anmelden</button>}
                {register && <button className={styles.button} onClick={e => handleRegister(e)}>Registrieren</button>}
            </form>
            <p className={styles.feedback}>{feedback}&nbsp;</p>
        </main>
    )
}
