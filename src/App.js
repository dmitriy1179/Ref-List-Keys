import React from "react";
import GithubUsers from "./GithubUsers"
import NewSearchingAdvice from "./NewSearchingAdvice"


export default function App() {
  return (
    <div className="App">
      <div className="my-2">
        <GithubUsers/>
      </div>
      <div>
        <NewSearchingAdvice/>
      </div>
    </div>
  );
}
