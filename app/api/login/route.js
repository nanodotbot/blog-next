import prisma from '@/app/prisma';
const bcrypt = require('bcrypt');

export const POST = async (req, res) => {
    const { username, password } = await req.json();

    console.log('login attempt');
    console.log(username, password);

    const user = await prisma.user.findFirst({
        where: {
            name: username
        }
    });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
        const { id, name, email, isAdmin } = user;
        const userWithoutPass = {
            id: id.toString(),
            name,
            email,
            isAdmin
        }
        console.log(userWithoutPass);
        return new Response(JSON.stringify(userWithoutPass));
    } else return new Response(JSON.stringify(null));
}