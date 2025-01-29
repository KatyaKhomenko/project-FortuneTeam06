import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
// import { updat } from "../../redux/contactsOps";

import css from "./Contact.module.css";
import { HiUser, HiPhone } from "react-icons/hi2";

export default function Contact({ item }) {
  const dispatch = useDispatch();

  return (
    <div className={css.contactCard}>
      <div className={css.contacts}>
        <div className={css.infoWrap}>
          <HiUser size={"20px"} title="contact icon" />
          <p>{item.name}</p>
        </div>
        <div className={css.infoWrap}>
          <HiPhone size={"20px"} title="phone icon" />
          <p>{item.number}</p>
        </div>
      </div>
      <button
        className={css.deleteButton}
        onClick={() => dispatch(deleteContact(item.id))}
      >
        Delete
      </button>
    </div>
  );
}