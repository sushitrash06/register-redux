import debounce from "lodash/debounce";
import React from "react";
import { withFormik } from "formik";
// import { render } from 'react-dom';
import Input from "../../components/Input";
// import DisplayFormikState from "../../components/DisplayFormState";
import { resetMessage, setMessage } from "../../actions/message";
import store from "../../store";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("tulis email yang benar")
      .required("Masukan Email"),
    username: Yup.string()
      .min(5, "Masukan minimum 5 karakter!")
      .max(20, "Maksimum 20 Karakter")
      .required("Masukan Username!!"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required!"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Password's not match")
      .required("Required!"),
    gender: Yup.string().required("pilih jenis kelamin"),
    numberphone: Yup.string()
      .required("masukan nomer telefon")
      .max(14, "nomer handphone yang anda masukan terlalu banyak")
      .min(10, "nomer handphone yang anda masukan terlalu sedikit")
  }),
  mapPropsToValues: (props) => ({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    gender: "",
    numberphone: ""
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values
    };

    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm"
});

const handleFormReset = (handleReset) => {
  store.dispatch(resetMessage());
  handleReset();
};

const validateField = debounce(
  ({ errors, value }) =>
    !errors && value
      ? store.dispatch(setMessage())
      : store.dispatch(resetMessage()),
  500
);

const MyForm = (props) => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="username"
        label="Username"
        type="username"
        placeholder="Masukan Username"
        errors={errors.username}
        value={values.username}
        touched={touched.username}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Masukan Email"
        errors={errors.email}
        value={values.email}
        touched={touched.email}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="Masukan Password"
        errors={errors.password}
        value={values.password}
        touched={touched.password}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <Input
        name="confirm_password"
        label="Confirm Password"
        type="password"
        placeholder="Masukan Password Kembali"
        errors={errors.confirm_password}
        value={values.confirm_password}
        touched={touched.confirm_password}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <Input
        name="numberphone"
        label="Nomer HP"
        type="number"
        placeholder="Masukan Nomer HP"
        errors={errors.numberphone}
        value={values.numberphone}
        touched={touched.numberphone}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />

      <label htmlFor="email" style={{ display: "block" }}>
        Jenis kelamin
      </label>
      <select
        name="color"
        value={values.color}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: "block", width: "100%" }}
      >
        <option value="">Pilihan Jenis Kelamin</option>
        <option value="Wanita">Wanita</option>
        <option value="Pria">Pria</option>
        <option value="blue" label="blue" />
        <option value="green" label="green" />
      </select>
      {errors.color && touched.color && (
        <div className="input-feedback">{errors.color}</div>
      )}
      <button
        type="button"
        className="outline"
        onClick={() => handleFormReset(handleReset)}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>

      {/* <DisplayFormikState {...props} /> */}
    </form>
  );
};

export default formikEnhancer(MyForm);
