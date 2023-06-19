import styles from '@/app/components/Drop.module.css'

const Drop = ({hover, handleDragIn, handleDragOut, handleDrop, handleInput}) => {
    return (
        <div className={styles.drop}>
            <label className={!hover ? styles.filelabel : styles.filelabel + ' ' + styles.in} htmlFor="file" onDragEnter={e => handleDragIn(e)} onDragOver={e => handleDragIn(e)} onMouseOver={e => handleDragIn(e)} onDragLeave={e => handleDragOut(e)} onMouseOut={e => handleDragOut(e)} onDrop={e => handleDrop(e)}><div>Bild auswählen oder hierher ziehen</div></label>
            <input className={styles.file} type="file" name="file" id="file" accept='image/*' onChange={e => handleInput(e)} />
        </div>
    )
}

export default Drop