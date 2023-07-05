import styles from '@/app/components/Header.module.css'
import { useSession } from 'next-auth/react'
import Link from "next/link"

const Header = ({handleMenu, active}) => {
    const {data: session} = useSession();

    return (
        <header className={styles.header}>

            <Link className='fontSizeSmall' href={'profile/' + session?.user?.name}>{session?.user?.name}</Link>

            <div className={!active ? styles.menu : styles.menu + ' ' + styles.active} onClick={handleMenu}>
                <span className={styles.menuline}></span>
                <span className={styles.menuline}></span>
            </div>
            
        </header>
    )
}

export default Header