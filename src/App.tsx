// import "./App.css";
// import Movies from "./components/Movies";
// import Authentication from "./components/Authentication";
// import { useState } from "react";

// function App() {
//   const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
//   const authHandler = (value) => {
//     setIsAuth(value);
//   };
//   if (isAuth) return <Movies authHandler={authHandler} />;
//   else return <Authentication authHandler={authHandler} />;

// }

// export default App;
import React from "react";
import { UserProvider } from "./providers/user";
import Authentication from "./components/Authentication";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import { MovieProvider } from "./providers/movie";

function App() {
  return (
    //everything inheriting from App will have the properties of UserProvider
    <UserProvider>
      <MovieProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Authentication></Authentication>}></Route>
            <Route path="/table" element={<Movies></Movies>}></Route>
          </Routes>
        </Router>
      </MovieProvider>
    </UserProvider>
  );
}

export default App;
