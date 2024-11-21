import { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="sidebar-btn" onClick={toggleSidebar}>
        Sidebar
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <section>
          <button
            type="button"
            className="hide-sidebar"
            onClick={toggleSidebar}
          >
            Hide Sidebar
          </button>
        </section>

        <SidebarOption link={"/auth/login"} value={"Login"} />

        <SidebarOption link={"/sign-up"} value={"Create Account"} />

        <SidebarOption link={"/add-item-formik"} value={"Add New Item"} />

        <SidebarOption link={"/my-account"} value={"My Account"} />

        <SidebarOption link={"/about-us"} value={"About Us"} />

        <SidebarOption link={"/Admin"} value={"Admin"} />

        <a href="#footer">
          <button type="button" className="sidebar-option">Contact Us</button>
        </a>
      </div>
    </div>
  );
}

function SidebarOption({ link, value }) {
  return (
    <section>
      <Link to={link}>
        <button type="button" className="sidebar-option">{value}</button>
      </Link>
    </section>
  );
}

export default Sidebar;
