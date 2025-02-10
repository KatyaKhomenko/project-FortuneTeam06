import { Link } from 'react-router-dom';
import css from "../UserAuth/UserAuth.module.css";
import userLogo from "../../assets/icons/user-logo.svg";

export default function UserAuth() {
    return (
        <div className={css.userAuth}>
            <Link to="/signin" className={css.link}>
    <span className={css.signup}>Sign in</span>
    <span className={css.icon}>
        <svg width="28" height="28">
            <use href={`${userLogo}#icon-outline`}></use>
        </svg>
    </span>
</Link>
        </div>
    );
}
