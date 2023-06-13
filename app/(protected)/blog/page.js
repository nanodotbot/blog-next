'use client'

import { useCallback, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'

const posts = [
    {
        author_id: 2,
        author: 'Floppy',
        image: '/smoke_white.jpg',
        date: '31.07.1985'
    }
]

const handleTextareaHeight = e => {
    e.target.style.height = '';
    e.target.style.height = e.target.scrollHeight + 1 + 'px';
}

const page = () => {
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(!'open');

    const [file, setFile] = useState();
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');

    const handleMenu = useCallback(e => {
        console.log('here i am');
        setActive(!active);
        setOpen(!open);
    })

    const handleDragIn = useCallback(e => {
        e.stopPropagation();
        e.preventDefault();
        setHover(true);
    })
    const handleDragOut = useCallback(e => {
        e.stopPropagation();
        e.preventDefault();
        setHover(false);
    })

    const handleDrop = useCallback(e => {
        e.stopPropagation();
        e.preventDefault();

        const drop = e.dataTransfer.files[0];
        setFile(drop);
        console.log(file);
    })
    const handleInput = useCallback(e => {
        const input = e.target.files[0];
        setFile(input);
        console.log(file);
    })
    const handleTextarea = useCallback(e => {
        handleTextareaHeight(e);
        setMessage(e.target.value);
    })
    const handleSubmit = useCallback(e => {

        console.log(file);
    })

    return (
        <main className={styles.main}>

            <header className={styles.header}>

                <Link className={styles.fontsizeSmall} href={'users/1'}>nanodotbot</Link>

                <div className={!active ? styles.menu : styles.menu + ' ' + styles.active} onClick={handleMenu}>
                    <span className={styles.menuline}></span>
                    <span className={styles.menuline}></span>
                </div>

            </header>


            <div className={styles.drop}>
                <label className={!hover ? styles.filelabel : styles.filelabel + ' ' + styles.in} htmlFor="file" onDragEnter={e => handleDragIn(e)} onDragOver={e => handleDragIn(e)} onMouseOver={e => handleDragIn(e)} onDragLeave={e => handleDragOut(e)} onMouseOut={e => handleDragOut(e)} onDrop={e => handleDrop(e)}><div>Bild auswählen oder hierher ziehen</div></label>
                <input className={styles.file} type="file" name="file" id="file" accept='image/*' onChange={e => handleInput(e)} />
            </div>

            <div id='preview'>

            </div>

            <div>
                <label htmlFor="message">Deine Nachricht (optional)</label>
                <textarea name="message" id="message" onChange={e => handleTextarea(e)} value={message}></textarea>
            </div>

            <button onClick={handleSubmit}>Absenden</button>

            <p className={styles.feedback}>{feedback}</p>

            {posts.map(post => {
                return (
                    <div key={post.author_id}>
                        <img
                            className={styles.image}
                            src={post.image}
                            alt={'blog post'}
                        />
                        <div className={styles.meta}>
                            <Link className={styles.fontsizeSmall} href={'/users/' + post.author_id}>{post.author}</Link>
                            <p className={styles.fontsizeSmall}>{post.date}</p>
                        </div>
                        <p>some text</p>
                    </div>
                )
            })}

            <dialog className={styles.modal} open={open}>
                <Link href={'users/1'}>users/1</Link>
                <Link href={'users/2'}>users/2</Link>
            </dialog>
        </main>
    )
}

export default page