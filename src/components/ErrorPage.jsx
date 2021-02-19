import React from "react";

export default function ErrorPage() {
  return (
    <>
      <br />
      <h1>Page Not Found :(</h1>
      <img
        alt="TubbyNuggetGIF"
        src="https://media2.giphy.com/media/TiCpCknRXo0riYM94I/giphy.gif"
        width="300"
        height="300"
        className="tubbyNugget"
      />
      <div>
        An error has occurred. <br /> Please check the console tab in your
        dev-tools for more specific information
      </div>
    </>
  );
}
