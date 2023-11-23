"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const getUserFromRequest = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user;
  }
  return null;
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error parsing stored user data:", error);

      // Supprimez les données utilisateur stockées en cas d'erreur
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("user");
      }
      return null;
    }
  });

  const updateUser = (newUser) => {
    setUser(newUser);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default UserProvider;
