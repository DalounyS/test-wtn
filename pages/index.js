import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Wethenew - CRM</title>
				<meta name="description" content="Wethenew - CRM" />
			</Head>

			<main className={styles.main}>
				<ul>
					<li>
						<div className={styles.msgIcon}></div>
						<div className={styles.msgContainer}>
							<h2 className={styles.msgName}></h2>
							<p className={styles.msgTypes}></p>
							<p className={styles.msgPhoneDuration}></p>
						</div>
						<p className={styles.msgDate}></p>
					</li>
				</ul>
			</main>
		</div>
	)
}
