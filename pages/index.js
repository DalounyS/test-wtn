import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Wethenew - CRM</title>
				<meta name="description" content="Wethenew - CRM" />
			</Head>

			<h2 className={styles.welcomeText}>Bienvenue sur la plateforme service client.</h2>
		</div>
	)
}
