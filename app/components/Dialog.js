import styles from '@/app/components/Dialog.module.css'
import Link from 'next/link'

const Dialog = ({open}) => {
    return (
        <dialog className={styles.modal} open={open}>
            <Link href={'users/1'}>users/1</Link>
            <Link href={'users/2'}>users/2</Link>
        </dialog>
    )
}

export default Dialog