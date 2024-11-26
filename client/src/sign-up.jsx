import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "./sign-up-schema.js";
import create_user from "./assets/create-user.svg";
import { scrollToTop, ChangePageTitle } from "./functions.js";

export function SignUp(props) {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    scrollToTop(), ChangePageTitle(props.title);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: signUpHandler,
  });

  async function signUpHandler(values, { resetForm }) {
    console.log("inside sign-up handler");
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log(result);
      // const userId = result.user.id;
      //console.log(userId);

      setMsg("Account Created Successfully! Redirecting To The Home Page!");
      setShowMsg(true);
      setShowButton(false);
      resetForm();

      setTimeout(() => navigate("/", { state: { userId: result.id } }), 3000);
    } catch (error) {
      console.error("Error: ", error);
      setMsg("Sign-Up Failed! Please Try Again!");
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 3000);
      resetForm();
    }
  }

  return (
    <>
      <section>
        <h1>THE SIGN-UP PAGE!</h1>
        <img
          src={create_user}
          className="logo react"
          alt="Create Account logo"
        />
      </section>

      {showMsg ? (
        <h2>{msg}</h2>
      ) : (
        <>
          <section>
            <h3>
              Please fill out the fields below to Create An Account on
              Give-Away:
            </h3>
          </section>

          <div className="sign-up-div">
            <form className="sign-up-form" onSubmit={formik.handleSubmit}>
              <section className="sign-up-form__name">
                <label htmlFor="firstName"> First Name </label>
                <br />
                <input
                  value={formik.values.firstName}
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="err-msg">
                  {formik.touched.firstName ? formik.errors.firstName : ""}{" "}
                </p>

                <label htmlFor="lastName"> Last Name</label>
                <br />
                <input
                  value={formik.values.lastName}
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="err-msg">
                  {formik.touched.lastName ? formik.errors.lastName : ""}{" "}
                </p>
              </section>
              <section className="sign-up-form__email">
                <label htmlFor="email"> Email</label>
                <br />
                <input
                  value={formik.values.email}
                  id="email"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="err-msg">
                  {formik.touched.email ? formik.errors.email : ""}{" "}
                </p>
              </section>
              <section className="sign-up-form__phone">
                <label htmlFor="phone"> Phone</label>
                <br />
                <input
                  value={formik.values.phone}
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="err-msg">
                  {formik.touched.phone ? formik.errors.phone : ""}{" "}
                </p>
              </section>

              <section className="sign-up-form__password">
                <label htmlFor="password"> Password</label>
                <br />
                <input
                  value={formik.values.password}
                  id="password"
                  name="password"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="err-msg">
                  {formik.touched.password ? formik.errors.password : ""}{" "}
                </p>
              </section>
              <section className="sign-up-form__confirmPassword">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <br />
                <input
                  value={formik.values.confirmPassword}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="err-msg">
                  {formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : ""}{" "}
                </p>
              </section>
              <section className="sign-up-form__actions">
                <button
                  type="submit"
                  className={formik.errors ? "" : "disabled"}
                >
                  {" "}
                  Sign Up
                </button>
              </section>
            </form>
            <h3>Have an Account already?</h3>
            <button onClick={() => navigate("../auth/login")}>Login</button>
          </div>
        </>
      )}

      {showButton ? (
        <section>
          <button type="button" onClick={() => navigate("/")}>
            Return To Main Page
          </button>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
