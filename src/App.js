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
      scope: [
        "email",
        "openid",
        "profile",
        "phone",
        "aws.cognito.signin.user.admin",
      ],
      redirectSignIn: "https://main.d3bhb28fni1uk6.amplifyapp.com/",
      redirectSignOut: "https://main.d3bhb28fni1uk6.amplifyapp.com/",
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

  return (
    <main className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello, World!</p>
      </header>
    </main>
  );
}

export default App;
