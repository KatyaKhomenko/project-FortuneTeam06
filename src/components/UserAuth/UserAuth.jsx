import { Link } from 'react-router-dom';
import css from "../UserAuth/UserAuth.module.css";


export default function UserAuth() {
    return (
        <div className={css.userAuth}>
            <Link to="/signin" className={css.link}>
                <p className={css.signup}>Sign in</p>
                <svg className={css.icon} width="28" height="28">
                    <use href="/user-logo.svg#icon-outline"></use>
                </svg>
            </Link>
        </div>
    )
}
