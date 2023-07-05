import styles from './loading.module.css'

const Loading = () => {
    return (
        <div className={styles.wrapper}>
            <div className="spinner">
                <div></div>
            </div>
        </div>
    )
};

export default Loading;