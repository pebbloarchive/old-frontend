import styles from '../components/styles/notfound.module.css';

const Page = () => {
return (
       <>
         <h1 className={styles.notFound_text}>404</h1>
          <div className={styles.notFound}>
            <h1>Oops...</h1>
            <h3>The page you're looking for doesn't exist.</h3>
            <a href="https://pebblo.org/">Take me home</a>
          </div>
       </>
    )
}

export default Page;