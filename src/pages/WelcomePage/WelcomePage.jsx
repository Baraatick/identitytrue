import {Link} from "react-router-dom"
import styles from "./ui/WelcomePage.module.css"

function Welcome() {
    return ( 
        <div className={styles.main}>
                  <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
            <div className={styles.container}>
                <div className={styles.content}></div>
                <div className={styles.title}>Welcome to PhotoAuthenticityChecker</div>
                <Link to="/MainPage">
                <button className={styles.btn}>Analyze my photos</button>
                </Link>
            </div>
        </div>
     );
}

export default Welcome;