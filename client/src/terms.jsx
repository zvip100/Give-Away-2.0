import { Link } from "react-router-dom";
import emoji from "./assets/emoji.svg";

function Terms() {
  return (
    <div>
      <section>
        <h1 style={{ color: "red" }}>Seriously???...</h1>
      </section>

      <section>
        <img src={emoji} className="logo react" alt="Shocked Emoji" />
      </section>

      <section>
        <Link to={"/"}>
          <button type="button">Main Page</button>
        </Link>
      </section>
    </div>
  );
}

export default Terms;
