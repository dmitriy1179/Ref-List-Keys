import React from "react";
import AutoFocus from "./AutoFocus";
import UserList from "./UserList";
import GithubUsers from "./GithubUsers"
import NewSearchingAdvice from "./NewSearchingAdvice"
import ParentRandomAdvice from "./ParentRandomAdvice"

const users = [
  {
    name: "Alex",
    id: 1
  },
  {
    name: "John",
    id: 2
  },
  {
    name: "Bob",
    id: 3
  }
];

export default function App() {
  return (
    <div className="App">
      <AutoFocus />
      <div className="mb-4">
        <UserList initialUsers={users} />
      </div>
      <div className="my-2">
        <ParentRandomAdvice />
      </div>
      <GithubUsers/>
      <div>
        <NewSearchingAdvice/>
      </div>
    </div>
  );
}
