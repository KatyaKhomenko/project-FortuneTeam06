import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { selectLoading } from "../../redux/contacts/selectors";

import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";

const initialValues = {
  name: "",
  number: "",
};

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const nameFieldId = useId();
  const numberlFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(addContact({ ...values }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.formWrap}>
        <div className={css.inputWrap}>
          <label htmlFor={nameFieldId} className={css.inputLabel}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            className={css.input}
          />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>
        <div className={css.inputWrap}>
          <label htmlFor={numberlFieldId} className={css.inputLabel}>
            Number
          </label>
          <Field
            type="phone"
            name="number"
            id={numberlFieldId}
            className={css.input}
          />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>

        <button type="submit" className={css.addButton} disabled={isLoading}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}