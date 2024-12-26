import React, { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const logout = useCallback(() => {
    setUser(null);
   
  }, []);

  useEffect(() => {
    let timer;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      // Reset the timer whenever user changes
      if (timer) clearTimeout(timer);
      timer = setTimeout(logout, 30 * 60 * 1000); // 30 minutes

      // Reset the timer on user interaction
      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(logout, 30 * 60 * 1000);
      };

      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
      };
    } else {
      localStorage.removeItem("user");
    }
  }, [user, logout]);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
