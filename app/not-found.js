import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
    return (
        <div className={styles.wrapper}>
            <h2>Seite nicht gefunden (404)</h2>
            <p>Wir vermuten, dass eine kleine Armee aus flauschigen Hasenbots die Seite entfernt hat. Unserer Erfahrung nach ist es unwahrscheinlich, dass die Seite je wieder auftauchen wird. Wir gehen eher davon aus, dass die Seite fein säuberlich in alle ihre Nullen und Einsen zerlegt und entsorgt wurde.</p>
            <p>Wir möchten dich beglückwünschen, dass du hier gelandet bist, und dir den digitalen Orden der Webspürnase für Nonsensseiten im Netz verleihen. Möge das allmächtige Schnüffel mit dir sein!</p>
            <p><Link href="/blog">Kehre zurück zum Blog.</Link></p>
        </div>
    )
}
