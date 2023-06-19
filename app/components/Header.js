import styles from '@/app/components/Header.module.css'
import Link from "next/link"

const Header = ({handleMenu, active}) => {
    return (
        <header className={styles.header}>

            <Link className='fontSizeSmall' href={'users/1'}>nanodotbot</Link>

            <div className={!active ? styles.menu : styles.menu + ' ' + styles.active} onClick={handleMenu}>
                <span className={styles.menuline}></span>
                <span className={styles.menuline}></span>
            </div>
            
        </header>
    )
}

export default Header