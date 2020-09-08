import { usePulse } from 'pulse-framework';
import core from '@pebblo/core';
import styles from '../styles/navbar.module.css'
import Router from 'next/router';
import { AccountUser } from '@pebblo/core/lib/controllers/accounts/account.interfaces';
import Link from 'next/link';

const Topnav = () => {
    const [loggedIn, user] = usePulse([core.accounts.state.IS_LOGGED, core.accounts.state.CACHE]);
    // const [current]: AccountUser[] = usePulse([core.accounts.collection.selectors.CURRENT]);
    const [current] = usePulse([core.accounts.collection.selectors.CURRENT]);
    return (
        <>
            <div className={styles.menu}>
                <button className={styles.menu_button}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={styles.menu_company}>
                    <Link href="/">
                        <a href="/"><h1>pebblo</h1></a>
                    </Link>
                </div>
                { loggedIn ? 
                <div className={styles.menu_user}>
                    <span>{current.name}</span>
                    <Link href={`/${current.username}`}><a href={`/${current.username}`}>
                        <img src={current.avatar} alt={current.username}/>
                    </a></Link>
                </div> : ''
                //  ? loggedIn : 
                //     <div className={styles.menu_buttons}>
                //         <Link href="/login"><a href="/login" className={styles.login}>Login</a></Link>
                //         <Link href="/create"><a href="/create" className={styles.create}>Get Started</a></Link>
                //     </div>
                 }
            </div>

            <div className={styles.menu_links}>
                <Link href="/about"><a href="/about">Features</a></Link>
                <Link href="/blog"><a href="/blog">Blog</a></Link>
                <Link href="/jobs"><a href="/jobs">Jobs</a></Link>
                <Link href="/blog/safety"><a href="/blog/safety">Safety</a></Link>
            </div>
        </>
    )
}

export default Topnav;