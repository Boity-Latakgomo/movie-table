import React, { useEffect, useState } from "react";
import "../Authentication.css";
import { Circles } from "react-loader-spinner";
import { useMutate } from "restful-react";
import { useUser } from "../providers/user";
import { ILogin } from "../providers/user/context";
import { Button } from "antd";

export default function Authentication(props: any) {
  const [isSignIn, setIsSignIn] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  //my useState
  const { loginUser } = useUser(); 

  // Sign-up states
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, seUsername] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // Sign-in states
  const [userNameOrEmailAddress, setEmailUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //login using the provider
  const handleLogin = () => {
    console.log("login");
    console.log(userNameOrEmailAddress)
    const data:ILogin = { userNameOrEmailAddress: userNameOrEmailAddress, password: loginPassword };
    loginUser(data);
  };

  const { mutate: signUp, loading: registerLoading } = useMutate({
    verb: "POST",
    path: "https://localhost:44311/api/services/app/Person/Create",
  });

  const { mutate: signIn, loading: loginLoading } = useMutate({
    verb: "POST",
    path: "https://localhost:44311/api/TokenAuth/Authenticate",
  });

  useEffect(() => {
    if (registerLoading || loginLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [registerLoading, loginLoading]);

  const signInClicked = (e: any) => {
    e.preventDefault();
    if (isSignIn) {
      if (userNameOrEmailAddress && loginPassword) {
        console.log("Now getting the token");
        signIn({
          userNameOrEmailAddress: userNameOrEmailAddress,
          password: loginPassword,
          rememberClient: true,
        })
          .then((result) => {
            setEmailUsername("");
            setLoginPassword("");
            props.authHandler(true);
            localStorage.setItem("token", result.result.accessToken);
            console.log("login worked ", result.result.accessToken);
          })
          .catch((e) => console.log("login got error: ", e.data.error.message));
      } else {
        console.log("Please fill all the fields");
      }
    } else {
      setIsSignIn(true);
    }
  };

  const signUpClicked = (e: any) => {
    e.preventDefault();
    if (!isSignIn) {
      if (name && surname && username && email && registerPassword) {
        signUp({
          userName: username,
          name: name,
          surname: surname,
          emailAddress: username,
          password: registerPassword,
        })
          .then(() => {
            setName("");
            setSurname("");
            seUsername("");
            setEmail("");
            setRegisterPassword("");
            console.log("register worked");
          })
          .catch((e) =>
            console.log("register got error: ", e.data.error.message)
          );
      } else {
        console.log("Please fill all the fields");
      }
    } else {
      setIsSignIn(false);
    }
  };

  return (
    <div className="main">
      <div className="form-box">
        {isSignIn ? (
          <form id="signInForm">
            <h1 id="title">Sign In</h1>
            <div className="sign-up-input-group">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Email / Username"
                  value={userNameOrEmailAddress}
                  onChange={(event) => setEmailUsername(event.target.value)}
                />
              </div>

              <div className="input-field">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </div>
            </div>
            {showLoader ? (
              <div className="loader-container">
                <Circles
                  height="50"
                  width="50"
                  color="#d74cf6"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : null}
            <div className="btn-field">
              <button
                type="button"
                id="signupBtn"
                className="disable"
                onClick={signUpClicked}
              >
                Sign up
              </button>
              <button type="button" id="signinBtn" onClick={handleLogin}>
                Sign in
              </button>
            </div>
          </form>
        ) : (
          <form id="signUpForm">
            <h1 id="title">Sign Up</h1>
            <div className="input-group">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="input-field">
                <input
                  type="text"
                  placeholder="Surname"
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                />
              </div>

              <div className="input-field">
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(event) => seUsername(event.target.value)}
                />
              </div>

              <div className="input-field">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="input-field">
                <input
                  type="password"
                  placeholder="Password"
                  value={registerPassword}
                  onChange={(event) => setRegisterPassword(event.target.value)}
                />
              </div>
            </div>
            {showLoader ? (
              <div className="loader-container">
                <Circles
                  height="50"
                  width="50"
                  color="#d74cf6"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : null}
            <div className="btn-field">
              <button type="button" id="signupBtn" onClick={signUpClicked}>
                Sign up
              </button>
              <button
                type="button"
                id="signinBtn"
                className="disable"
                onClick={signInClicked}
              >
                Sign in
              </button>
            </div>
          </form>
        )}
      </div>
      <div id="alertPopupContainer">
        <div className="alertPopup">
          <h2>Alert!</h2>
          <div className="divider"></div>
          <p className="alertpopUpText">Please fill all the fields</p>
          <div className="pressableTextContainer">
            <p id="pressableText">OK</p>
          </div>
        </div>
      </div>
      <div id="successAlertPopupContainer">
        <div className="alertPopup">
          <h2>Success!</h2>
          <div className="divider"></div>
          <p className="alertpopUpText" id="SuccessText"></p>
          <div className="pressableTextContainer">
            <p id="successPressableText">OK</p>
          </div>
        </div>
      </div>
    </div>
  );
}
