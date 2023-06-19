'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

import Link from 'next/link'
import Header from '@/app/components/Header'
import Drop from '@/app/components/Drop'
import Textarea from '@/app/components/Textarea'
import Dialog from '@/app/components/Dialog'
import { getSignature, saveToDatabase, uploadImage } from '@/app/_actions'


const posts = [
    {
        author_id: 1,
        author: 'Algernon',
        image: '/logo.png',
        date: '31.03.1979'
    },
    {
        author_id: 2,
        author: 'Floppy',
        image: '/smoke_white.jpg',
        date: '31.07.1985'
    }
]

const page = () => {
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(!'open');

    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleMenu = e => {
        setActive(!active);
        setOpen(!open);
    }

    const handleDragIn = e => {
        e.stopPropagation();
        e.preventDefault();
        setHover(true);
    }
    const handleDragOut = e => {
        e.stopPropagation();
        e.preventDefault();
        setHover(false);
    }

    const handleDrop = e => {
        e.stopPropagation();
        e.preventDefault();

        const drop = e.dataTransfer.files[0];
        setFiles(prevFiles => [...prevFiles, drop]);
        console.log(files);
        const reader = new FileReader();
        reader.onload = e => setPreviews(prevPreviews => [...prevPreviews, e.target.result]);
        reader.readAsDataURL(drop);
    }
    const handleInput = e => {
        const input = e.target.files[0];
        setFiles(prevFiles => [...prevFiles, input]);
        console.log(files);
        const reader = new FileReader();
        reader.onload = e => setPreviews(prevPreviews => [...prevPreviews, e.target.result]);
        reader.readAsDataURL(input);
    }
    useEffect(() => {
        console.log(previews);
    }, [previews])

    const handleTextareaInput = e => {
        setMessage(e.target.value);
    }
    const action = async () => {
        setFeedback('');
        console.log('action: ' + previews);
        if(previews.length === 0) {
            setFeedback('Ein Bild ist ein Muss.');
            return;
        }

        const file = previews[0];
        
        const result = await uploadImage(file);
        console.log(result);
        console.log(result.secure_url);
    }

    return (

        <main className={styles.main}>

            <Header handleMenu={handleMenu} active={active} />

            <form action={action}>

                <Drop handleDragIn={handleDragIn} handleDragOut={handleDragOut} handleDrop={handleDrop} handleInput={handleInput} />

                {previews?.map((preview, index) => {
                    return <img className={styles.preview} key={index} src={preview}/>
                })}

                <Textarea handleTextareaInput={handleTextareaInput} message={message} />

                <button>Absenden</button>
            
            </form>

            <p className={styles.feedback}>{feedback}{message}</p>

            {posts?.map(post => {
                return (
                    <div key={post.author_id}>
                        <img
                            className={styles.image}
                            src={post.image}
                            alt={'blog post'}
                        />
                        <div className={styles.meta}>
                            <Link className='fontSizeSmall' href={'/users/' + post.author_id}>{post.author}</Link>
                            <p className='fontSizeSmall'>{post.date}</p>
                        </div>
                        <p>some text</p>
                    </div>
                )
            })}

            <Dialog open={open} />

        </main>

    )
}

export default page