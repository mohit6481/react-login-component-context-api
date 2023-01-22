import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggeddInInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggeddInInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  }

  return <AuthContext.Provider value ={
    {
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler,
    }
  }>{children}</AuthContext.Provider>;
};

export default AuthContext;
