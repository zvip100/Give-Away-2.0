import { useState } from "react";

export function Static() {
  const [fetched, setFetched] = useState(false);
  const [body, setBody] = useState("");

  async function handleBtnClick() {
    const response = await fetch("http://localhost:4000/token", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.text();
    console.log("static fetch: ", result);
    setFetched(true);
    setBody(result);
  }
  return (
    <div>
      {fetched ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </>
      ) : (
        <>
          <button type="button" onClick={handleBtnClick}>
            Static
          </button>
        </>
      )}
    </div>
  );
}
