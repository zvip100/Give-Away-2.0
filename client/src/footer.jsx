import copy from "./assets/copy.svg";

function Footer() {
  const emaileLink = "info@give-away.online";
  const phoneNumber = "13472861279";

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert("copied to clipboard");
    } catch (err) {
      console.error("Error : ", err);
    }
  }

  return (
    <footer id="contact-us">
      <h4>Contact Us:</h4>
      <address>
        <p>Email:</p>
        <a href="mailto:info@give-away.online?subject=Give-Away Info">
          info@give-away.online
        </a>{" "}
        {""}
        <img
          src={copy}
          style={{ height: "2%", width: "2%" }}
          alt="Copy Text Icon"
          onClick={() => copyText(emaileLink)}
        ></img>
        <p>Phone Number:</p>
        <a href="tel:+13472861279">+1-347-286-1279</a> {""}
        <img
          src={copy}
          style={{ height: "2%", width: "2%" }}
          alt="Copy Text Icon"
          onClick={() => copyText(phoneNumber)}
        ></img>
      </address>

      <section>
        <small>
          Copyright © 2024 <a href="https://give-away.online"> Give-Away</a> -
          All Rights Reserved.
        </small>
        <br /> <br />
        <small>
          <a href="/terms-&-conditions">Terms & Conditions</a>
        </small>
      </section>
    </footer>
  );
}

export default Footer;
