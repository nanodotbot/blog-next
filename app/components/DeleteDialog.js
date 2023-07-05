import styles from '@/app/components/DeleteDialog.module.css'

const DeleteDialog = ({open, contentType, contentOwner, creationDate, content, closeModal, handleDeleteContent}) => {
    return (
        <dialog className={styles.modal} open={open}>
            <div>
                <p>Möchtest du diesen {contentType} wirklich löschen?</p>
                <p className={styles.contents}>{contentOwner} | {creationDate} | {content}</p>
                <button className={styles.deleteBtn} onClick={handleDeleteContent}>Ja, weg damit!</button>
                <button onClick={closeModal}>Nein, das ist ein wichtiger Beitrag für den Weltfrieden!</button>
            </div>
        </dialog>
    )
}

export default DeleteDialog