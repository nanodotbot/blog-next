import styles from '@/app/components/SignoutDialog.module.css'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const SignoutDialog = ({open}) => {
    const {data: session } = useSession();
    
    return (
        <dialog className={styles.modal} open={open}>
            <div>
                <Link href={'/profile/' + session?.user?.name}>Profil anpassen</Link>
                <button onClick={() => signOut()}>Ausloggen</button>
            </div>
        </dialog>
    )
}

export default SignoutDialog