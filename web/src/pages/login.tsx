import { usePulse } from 'pulse-framework'
import core from '@pebblo/core'
import Router from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../components/styles/auth.module.css'

export default function Page() {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loggedIn] = usePulse([core.accounts.state.IS_LOGGED]);

  if(loggedIn && process.browser) Router.push('/');

  const userLogin = async (ev) => {
    ev.preventDefault();
    return core.accounts.Login(email, password);
  }

  return (
    <>
    <Head>
      <title>Pebblo - Login</title>
    </Head>
      <div className={styles.auth_right}>
        <img src="images/svg/man-computer-desk.svg"/>
      </div>

      <form className={styles.auth_form} onSubmit={userLogin}>
        <h1 className={styles.auth_title}>Welcome Back :)</h1>
          <input
            className={styles.auth_form_email}
            type="email"
            name="login_email"
            placeholder="Email Address"
            required
            onChange={(change) => { setEmail(change.target.value) }}
          />
          <input
            className={styles.auth_form_password}
            type="password"
            name="login_password"
            placeholder="Password"
            required
            onChange={(change) => { setPassword(change.target.value) }}
          />

          <input type="submit" value="Login"/>
      </form>
    </>
  )
}