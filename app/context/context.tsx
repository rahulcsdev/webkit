//@ts-nocheck comment at the top of the file.
import React from 'react';

import {  useState } from "react";

export const User_data = React.createContext();

function Context({ children }) {
    const [user, setUser] = useState();
  
    return (
      <User_data.Provider value={{ user, setUser }}>
        {children}
      </User_data.Provider>
    );
  }

  export {Context}
  