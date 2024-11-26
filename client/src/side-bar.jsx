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
      <div onClick={toggleSidebar}>
        <button type="button" className="sidebar-btn">
          Sidebar
        </button>
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <section>
          <button
            type="button"
            className="hide-sidebar"
            onClick={toggleSidebar}
          >
            Close Sidebar
          </button>
        </section>

        <SidebarOption type={"link"} link={"/auth/login"} value={"Login"} />

        <SidebarOption
          type={"link"}
          link={"/sign-up"}
          value={"Create Account"}
        />

        <SidebarOption
          type={"#"}
          link={"#search-item"}
          value={"Search Any Item"}
        />

        <SidebarOption
          type={"#"}
          link={"#item-filter"}
          value={"Items by Category"}
        />

        <SidebarOption
          type={"link"}
          link={"/add-item-formik"}
          value={"Add New Item"}
        />

        <SidebarOption
          type={"link"}
          link={"/my-account"}
          value={"My Account"}
        />

        <SidebarOption type={"link"} link={"/about-us"} value={"About Us"} />

        <SidebarOption type={"link"} link={"/Admin"} value={"Admin"} />

        <SidebarOption type={"#"} link={"#contact-us"} value={"Contact Us"} />

        <SidebarOption type={"#"} link={"#top"} value={"Top Of Page"} />
      </div>
    </div>
  );
}

function SidebarOption({ type, link, value }) {
  return (
    <section>
      {type === "link" ? (
        <Link to={link}>
          <button type="button" className="sidebar-option">
            {value}
          </button>
        </Link>
      ) : (
        <a href={link}>
          <button type="button" className="sidebar-option">
            {value}
          </button>
        </a>
      )}
    </section>
  );
}

export default Sidebar;
