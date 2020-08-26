import styles from '../styles/settings.module.css'

const Page = () => {
    return (
        <>
            <div className={styles.content}>
                <h1 className={styles.title}>Privacy</h1>

                    <label className={styles.checkbox}>
                        <div className={styles.checkbox_container}>
                            <input type="checkbox" name="" id=""/>
                            <span className={styles.checkbox_box}></span>
                        </div>
                        <h1>Private</h1>
                        <p>Set your account so only people you approve can see your posts.
                            <a href="">More Info.</a>
                        </p>
                    </label>

                <h1 className={styles.subtitle}>Parent Email</h1>
                <p className={styles.note}>Mainly used for minors so parents can keep an eye on the safety of their children. You can learn more about how <a href="">Parent Safety</a> works.</p>
                    <label className={styles.guardian_email}>
                        <input type="email" name="" id="" placeholder="Parent Email"/>
                    </label>

                    <hr/>
                <h1 className={styles.title}>Messaging</h1>
                    <label className={styles.checkbox}>
                        <div className={styles.checkbox_container}>
                            <input type="checkbox" name="" id=""/>
                            <span className={styles.checkbox_box}></span>
                        </div>
                        <h1>Allow comments by anyone</h1>
                        <p>People who don't follow you will be able to comment on your posts.
                            <a href="">More Info.</a>
                        </p>
                    </label>
                <h1 className={styles.subtitle}>Who can message me?</h1>
                    
                    <label className={styles.checkbox}>
                        <div className={styles.checkbox_container}>
                            <input type="checkbox" name="" id=""/>
                            <span className={styles.checkbox_box}></span>
                        </div>
                        <h1>Followers</h1>
                        <p>Only people who you follow and follow you can send you messages.</p>
                    </label>
                    <label className={styles.checkbox}>
                        <div className={styles.checkbox_container}>
                            <input type="checkbox" name="" id=""/>
                            <span className={styles.checkbox_box}></span>
                        </div>
                        <h1>Outside Messages</h1>
                        <p>Allow messages from people who you don't follow.
                            <a href="">More Info.</a>
                        </p>
                    </label>
                <h1 className={styles.subtitle}>Comments &amp; Direct Messages</h1>

                    <label className={styles.checkbox}>
                        <div className={styles.checkbox_container}>
                            <input type="checkbox" name="" id="" checked/>
                            <span className={styles.checkbox_box}></span>
                        </div>
                        <h1>Scan Messages</h1>
                        <p>Scan and delete messages that may be offensive or explicit.
                            <a href="">More Info.</a>
                        </p>
                    </label>
                    <label className={styles.checkbox}>
                        <div className={styles.checkbox_container}>
                            <input type="checkbox" name="" id="" checked/>
                            <span className={styles.checkbox_box}></span>
                        </div>
                        <h1>Scan Media</h1>
                        <p>Scan and delete media that may contain explicit content.
                            <a href="">More Info.</a>
                        </p>
                    </label>
            </div>
        </>
    )
}

export default Page;