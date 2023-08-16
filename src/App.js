import logo from "./logo.svg";
import { Auth, Amplify } from "aws-amplify";
import { useEffect } from "react";
import "./App.css";

const amplifyConfiguration = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_Dv8jzfm5v",
    userPoolWebClientId: "54vqq0s0j59hopl3d160cnpq7r",
    oauth: {
      domain: "apgexample.auth.us-east-1.amazoncognito.com",
      scope: ["email", "profile", "openid", "phone"],
      redirectSignIn: "https://main.d2ygm6ezozgaf9.amplifyapp.com/",
      redirectSignOut: "https://main.d2ygm6ezozgaf9.amplifyapp.com/",
      clientId: "54vqq0s0j59hopl3d160cnpq7r",
      responseType: "code",
    },
  },
};

Amplify.configure(amplifyConfiguration);

const checkLogin = async () => {
  const currentUserInfo = await Auth.currentUserInfo();
  console.log("currentUserInfo", currentUserInfo);
  if (!currentUserInfo) {
    await Auth.federatedSignIn();
  }
  const result = await Auth.currentAuthenticatedUser();
  console.log("result", result);
};

function App() {
  useEffect(() => {
    checkLogin();
  });
  const onSignOut = () => {
    Auth.signOut();
  };

  return (
    <div className="App">
      <button onClick={onSignOut}>Sign Out</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
