'use server'

import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from 'uuid';

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