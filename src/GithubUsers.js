import React from "react";

class GithubUsers extends React.Component {
  state = {
    gitUsers : null,
    errors : null
  }
  async componentDidMount() {
    try {
      const usersJson = await fetch("https://api.github.com/users");
      if (!usersJson.ok) {
        throw new Error(usersJson.statusText)
      }
      const usersData = await usersJson.json();
      this.setState({
        gitUsers: usersData
      });
    }
    catch(error) {
      console.log(error)
      this.setState({
        errors: error
      });
    }
  }
  render() {
    if (this.state.errors !== null) {
      return <div>{this.state.errors.toString()}</div>
    }
    if (this.state.gitUsers === null) {
      return <div>Loading</div>;
    }
    return (
      <div>
          <ul style={{display:"flex", maxWidth:"100%", flexWrap:"wrap", justifyContent:"center"}}>
              {this.state.gitUsers.map((user) => (
                <li key={user.id} className="gitUser">
                  <img style={{width:"100px", 
                    height:"100px",
                    borderRadius:"50%"}}
                    src={user.avatar_url}
                    alt="avatar"/>
                  <span style={{margin:"10px", fontSize:"20px"}}>{user.login}</span>
                  <a style={{textDecoration:"none",
                    margin:"10px auto",
                    color:"white"}}
                    href={user.html_url}
                    rel="noopener noreferrer" 
                    target="_blank">
                      <span style={{
                        padding: "10px",
                        borderRadius: "5px",
                        background:"green"}}>
                        Open profile
                      </span>
                  </a>
                </li>
              ))}
          </ul>
      </div>  
    )
  }
}

export default GithubUsers