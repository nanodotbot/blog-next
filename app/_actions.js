'use server'

import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from 'uuid';
import prisma from "./prisma";

const bcrypt = require('bcrypt');

export const handleRegister = async (username, email, password) => {
    // console.log(username, email, password);
    const check = await prisma.user.findFirst({
        where: {
            name: username
        }
    });

    if (check) {
        return JSON.stringify({
            message: 'Benutzername ist bereits vergeben.'
        });
    }

    const user = await prisma.user.create({
        data: {
            name: username,
            password: await bcrypt.hash(password, 10)
        }
    });
    // console.log(user);
    // console.log(user.name);
    return JSON.stringify({
        message: "Benutzerkonto wurde erfolgreich erstellt."
    });
}

export const uploadImage = async (file) => {
    cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
    const result = await cloudinary.uploader.upload(file,
        {
            public_id: uuidv4(),
            folder: "blog-next"
        },
        (error, result) => {
            console.log('error');
            console.log(error);
            console.log('result');
            console.log(result);
        }
    );
    return result;
}

export const uploadPostData = async (name, pictures, message) => {
    if (!message) {
        try {
            // console.log('no message');
            // console.log(name);
            // console.log(pictures);
            const posted = await prisma.post.create({
                data: {
                    author: {
                        connect: {
                            name
                        }
                    },
                    pictures
                }
            })
            // console.log(posted);
            return posted;
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(name);
    // console.log(pictures);
    // console.log(message);
    const posted = await prisma.post.create({
        data: {
            author: {
                connect: {
                    name
                }
            },
            pictures,
            message
        }
    })
    // console.log(posted);
    return posted;
}

export const uploadComment = async (id, comment, uid) => {
    // console.log('upload comment');
    try {
        const commented = await prisma.comment.create({
            data: {
                message: comment,
                User: {
                    connect: {
                        id: BigInt(uid)
                    }
                },
                Post: {
                    connect: {
                        id: BigInt(id)
                    }
                }
            }
        })
        // console.log('commented');
        // console.log(commented);
        return commented;

    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (name) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                name: name
            }
        });
        // console.log(user);
        if (user === null) {
            return null;
        }
        // console.log(user.name);
        return JSON.stringify({
            name: user.name
        })
    } catch (error) {
        console.log(error);
    }
}
export const getBio = async (name) => {
    try {
        const bio = await prisma.profile.findFirst({
            where: {
                user: {
                    name: name
                }
            }
        });
        if (bio === null) {
            return null;
        }
        // console.log(bio.bio);
        return JSON.stringify({
            bio: bio.bio
        })
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = async () => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true
                    }
                },
                likedBy: true,
                dislikedBy: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        console.log(posts);
        return posts;
    } catch (error) {
        console.log(error);
    }
}
export const getComments = async () => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                User: {
                    select: {
                        name: true
                    }
                },
                Post: {
                    select: {
                        id: true
                    }
                }
            }
        })
        console.log(comments);
        return comments;
    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = async (id, author, user) => {
    if(user !== author) {
        // console.log(user, author);
        return;
    }
    try {
        const deleted = await prisma.comment.delete({
            where: {
                id
            }
        })
        // console.log(deleted);
        return deleted;
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = async (id, author, user) => {
    if(user !== author) {
        // console.log(user, author);
        return;
    }
    try {
        await prisma.comment.deleteMany({
            where: {
                Post: {
                    id
                }
            }
        }).then(result => {
            // console.log(result);
            const deleted = prisma.post.delete({
                where: {
                    id
                }
            })
            // console.log(deleted);
            return deleted;
        })
    } catch (error) {
        console.log(error);
    }
}

export const createBio = async (id, bio) => {
    try {
        const created = await prisma.profile.create({
            data: {
                bio,
                user: {
                    connect: {
                        id: BigInt(id)
                    }
                }
            }
        })
        console.log('created');
        console.log(created);
        return created;
    } catch (error) {
        console.log(error);
    }
}

export const updateBio = async (id, bio) => {
    try {
        // console.log('try updateBio');
        // console.log(id);
        // console.log(bio);
        const updated = await prisma.profile.update({
            where: {
                userId: BigInt(id)
            },
            data: {
                bio
            }
        })
        // console.log('updated');
        // console.log(updated);
        return updated;
    } catch (error) {
        console.log(error);
    }
}
export const updatePassword = async (id, password) => {
    try {
        const updated = await prisma.user.update({
            where: {
                id: BigInt(id)
            },
            data: {
                password: await bcrypt.hash(password, 10)
            }
        })
        return updated;
    } catch (error) {
        console.log(error);
    }
}