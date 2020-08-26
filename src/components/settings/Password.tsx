import styles from '../styles/settings.module.css'

const Page = () => {
    return (
        <>
        <title>Settings &gt; Password</title>

                <div className={styles.content}>
                    <h1 className={styles.title}>Change Password</h1>
                        <form className={styles.change_password}>
                            <input type="password" name="" id="" placeholder="Current Password" required/>
                            <hr/>
                            <input type="password" name="" id="" placeholder="New Password" required/>
                            <input type="password" name="" id="" placeholder="Repeat Password" required/>
                            

                                <div className={styles.submit}>
                                    <input type="submit" value="Save Changes"/>
                                </div>
                        </form>
                </div>
        </>
    )
}

export default Page;