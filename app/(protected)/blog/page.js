'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

import Link from 'next/link'
import Header from '@/app/components/Header'
import Drop from '@/app/components/Drop'
import Textarea from '@/app/components/Textarea'
import SignoutDialog from '@/app/components/SignoutDialog'
import { deleteComment, deletePost, getComments, getPosts, uploadComment, uploadImage, uploadPostData } from '@/app/_actions'
import { useSession } from 'next-auth/react'
import DeleteDialog from '@/app/components/DeleteDialog'
import Spinner from '@/app/components/Spinner'

const blog = () => {
    const { data: session } = useSession({
        required: true
    })

    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(!'open');
    const [openDelete, setOpenDelete] = useState(!'open');
    const [contentType, setContentType] = useState('');
    const [contentId, setContentId] = useState('');
    const [contentOwner, setContentOwner] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [content, setContent] = useState('');

    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');
    const [spinner, setSpinner] = useState(true);

    const [comments, setComments] = useState([]);

    const [posts, setPosts] = useState([]);
    const [resultValue, setResultValue] = useState('');
    const [dbcomments, setDbcomments] = useState([]);
    const [commentResultValue, setCommentResultValue] = useState('');

    const fetchPosts = async () => {
        console.log('fetching');
        const fetchedPosts = await getPosts();
        console.log(fetchedPosts);
        return fetchedPosts;
    }
    const fetchComments = async () => {
        const fetchedComments = await getComments();
        return fetchedComments;
    }

    useEffect(() => {
        fetchPosts().then(result => {
            setPosts(result)
        });
        fetchComments().then(result => {
            setDbcomments(result)
        })
    }, [])

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
        // setFiles(drop)
        setFiles(prevFiles => [...prevFiles, drop]);
        console.log(files);
        const reader = new FileReader();
        reader.onload = e => setPreviews(prevPreviews => [...prevPreviews, e.target.result]);
        reader.readAsDataURL(drop);
    }
    const handleInput = e => {
        const input = e.target.files[0];
        // setFiles(input)
        setFiles(prevFiles => [...prevFiles, input]);
        console.log(files);
        const reader = new FileReader();
        reader.onload = e => setPreviews(prevPreviews => [...prevPreviews, e.target.result]);
        reader.readAsDataURL(input);
    }
    // useEffect(() => {
    //     console.log(previews);
    // }, [previews])

    const handleTextareaInput = e => {
        setMessage(e.target.value);
    }

    const handleCommentInput = (index, e ) => {
        const helperComments = [...comments];
        helperComments[index] = e.target.value;
        setComments(helperComments);
        console.log(comments);
    }

    const handleUpload = async () => {
        setSpinner(true);
        // console.log('upload');
        // console.log(session?.user.name);
        // console.log(pictures);
        // console.log(message);
        const postResult = await uploadPostData(session?.user.name, pictures, message);
        return postResult;
    }

    const action = async () => {
        setFeedback('');
        // console.log('action: ' + previews);
        if(previews.length === 0) {
            await handleUpload().then(result => {
                // console.log('where is my result?');
                // console.log(result);
                setResultValue(result);
            });
            setFiles([]);
            setPreviews([]);
            setPictures([]);
            setMessage('');
            return;
        }

        files.forEach(file => {
            // console.log('here we are');
            if(file.size > 15 * 1024 ** 2) {
                setFeedback('Das Bild "' + file.name + '" übersteigt 15 Megabyte.');
                return;
            };
        })
        previews.forEach(async preview => {
            const result = await uploadImage(preview);
            // console.log(result.secure_url);
            setPictures(prevPictures => [...prevPictures, result.secure_url]);
        })
    }
    useEffect(() => {
        if(pictures.length === 0 || pictures.length !== previews.length){
            // console.log(pictures.length, previews.length);
            return;
        }
        // console.log(pictures);

        handleUpload().then(result => {
            // console.log(result);
            setResultValue(result);
            // console.log(resultValue);
        });
        setFiles([]);
        setPreviews([]);
        setPictures([]);
        setMessage('');
    }, [pictures])

    const handleComment = async (id, index) => {
        if(!comments[index]) {
            // console.log(session?.user);
            return;
        }
        // console.log(id, comments[index], parseInt(session?.user.id));
        await uploadComment(id, comments[index], session?.user.id)
        .then(result => {
            // console.log(result);
            setCommentResultValue(result);
            const helperComments = [...comments];
            helperComments[index] = '';
            setComments(helperComments);    
        });
    }
    
    useEffect(() => {
        fetchPosts().then(result => {
            // console.log(result);
            setPosts(result)
            // console.log(posts);
        });
        setSpinner(false);
    }, [resultValue]);

    useEffect(() => {
        fetchComments().then(result => {
            setDbcomments(result)
        })
        setSpinner(false);
    }, [commentResultValue])

    // useEffect(() => {
    //     // console.log(dbcomments);
    //     dbcomments.map(comment => {
    //         console.log(comment);
    //         console.log(comment.Post);
    //     })
    // }, [dbcomments])

    const openDeleteModal = (contentTypeDelete, contentIdDelete, contentOwnerDelete, creationDateDelete, contentDelete) => {
        setContentType(contentTypeDelete);
        setContentId(contentIdDelete);
        setContentOwner(contentOwnerDelete);
        setCreationDate(creationDateDelete);
        setContent(contentDelete);
        // console.log(contentType, contentId, contentOwner, creationDate, content);
        setOpenDelete(!openDelete);
    }

    const closeDeleteModal = () => {
        setOpenDelete(!openDelete);
    }

    const handleDeleteContent = async (deleteId, deleteOwner) => {
        // console.log(deleteId, deleteOwner, session.user.name);
        if(contentType === 'Kommentar'){
            // console.log('comment');
            const deleted = await deleteComment(deleteId, deleteOwner, session.user.name);
            // console.log('deleted?');
            // console.log(deleted);
            setOpenDelete(!openDelete);
            fetchComments().then(result => {
                setDbcomments(result)
            });    
        }
        if(contentType === 'Post'){
            // console.log('post');
            const deleted = await deletePost(deleteId, deleteOwner, session.user.name);
            // console.log('deleted?');
            // console.log(deleted);
            setOpenDelete(!openDelete);
            fetchPosts().then(result => {
                setPosts(result)
            });
        }
    }

    return (

        <main className={styles.main}>

            <Header handleMenu={handleMenu} active={active} />

            <form action={action}>

                <Drop handleDragIn={handleDragIn} handleDragOut={handleDragOut} handleDrop={handleDrop} handleInput={handleInput} />

                {previews?.map((preview, index) => {
                    return <img className={styles.preview} key={index} src={preview}/>
                })}

                <Textarea handleTextareaInput={handleTextareaInput} message={message} label='Deine Nachricht (optional)' />

                <button>Absenden</button>
            
            </form>

            {!spinner ? <p className={styles.feedback}>{feedback}</p> : <div className={styles.spinner}><Spinner /></div>}

            {posts?.map((post, index) => {
                return (

                    <div key={post.id}>
                        <hr className={styles.hr} />
                        <div className={styles.meta}>
                            <Link className='fontSizeSmall' href={'/users/' + post.author.name}>{post.author.name}</Link>
                            {post.author.name === session?.user?.name ?
                                <div className={styles.delete}>
                                    <p className='fontSizeSmall'>{post.createdAt.toLocaleString() }</p>
                                    <button className={'inline' + ' ' + styles.deleteBtn} onClick={() => openDeleteModal('Post', post.id, post.author.name, post.createdAt.toLocaleString(), post.message)}>Löschen</button>
                                </div>
                                :
                                <p className='fontSizeSmall'>{post.createdAt.toLocaleString() }</p>
                            }
                        </div>

                        {post.pictures?.map(picture => {
                            return (
                                <img
                                    className={styles.image}
                                    src={picture}
                                    alt={picture}
                                    key={picture}
                                />
                            )
                        }
                        )}

                        <p className={styles.message}>{post.message}</p>

                        {dbcomments?.map(comment => {

                            if(comment.Post.id === post.id){
                                return (
                                    <div key={comment.id}>
                                        <hr className={styles.hr} />
                                        <div className={styles.meta}>
                                            <Link className='fontSizeSmall' href={'/users/' + comment.User.name}>{comment.User.name}</Link>

                                            {comment.User.name === session?.user?.name ?
                                                <div className={styles.delete}>
                                                    <p className='fontSizeSmall'>{comment.createdAt.toLocaleString() }</p>
                                                    <button className={'inline' + ' ' + styles.deleteBtn} onClick={() => openDeleteModal('Kommentar', comment.id, comment.User.name, comment.createdAt.toLocaleString(), comment.message)}>Löschen</button>
                                                </div>

                                                :
                                                <p className='fontSizeSmall'>{comment.createdAt.toLocaleString() }</p>
                                            }

                                        </div>
                                        <p className={styles.message}>{comment.message}</p>
                                    </div>
                                )
                            }

                        })}

                        <form action={() => handleComment(post.id, index)}>
                            <Textarea handleTextareaInput={e => handleCommentInput(index, e)} message={comments[index]} label='Dein Kommentar' />
                            <button>Absenden</button>
                        </form>
                    </div>
                )
            })}

            <SignoutDialog open={open} />

            <DeleteDialog 
                open={openDelete} 
                contentType={contentType} 
                contentOwner={contentOwner} 
                creationDate={creationDate} 
                content={content} 
                handleDeleteContent={() => handleDeleteContent(contentId, contentOwner)} 
                closeModal={closeDeleteModal}
            />

        </main>

    )
}

export default blog