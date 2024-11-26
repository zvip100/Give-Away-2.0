import confirmed_logo from "./assets/user-confirmed.svg";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChangePageTitle } from "./functions";

function Success({ title }) {
  useEffect(() => ChangePageTitle(title), []);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state;
  const username = state?.userName;
  const [showMsg, setShowMsg] = useState(false);

  function capitalize() {
    const fullName = username.split(" ");
    const firstChar1 = fullName[0].substring(0, 1).toUpperCase();
    const firstChar2 = fullName[1].substring(0, 1).toUpperCase();
    const otherChars1 = fullName[0].substring(1);
    const otherChars2 = fullName[1].substring(1);
    const final = firstChar1.concat(otherChars1, " ", firstChar2, otherChars2);

    return final;
  }

  const capitalizedName = capitalize();

  setTimeout(() => {
    navigate("/", {
      state: {
        userId: state.userId,
        userName: username,
        admin: state.isAdmin,
      },
    });
  }, 4000);

  setTimeout(() => setShowMsg(true), 2000);

  return (
    <div>
      <h1 className="welcome_user_msg">Hello {capitalizedName}!</h1>

      <section>
        <img
          src={confirmed_logo}
          className="logo react"
          alt="User Confirmed logo"
        />
      </section>

      {showMsg && <h3>Redirecting you to the Homepage...</h3>}
    </div>
  );
}
export default Success;
