// ClickContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface ClickContextType {
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  id:string,
  setID: React.Dispatch<React.SetStateAction<string>>;
}

const ClickContext = createContext<ClickContextType | undefined>(undefined);

export const useClickContext = (): ClickContextType => {
  const context = useContext(ClickContext);
  if (!context) {
    throw new Error('useClickContext must be used within a ClickProvider');
  }
  return context;
};

interface ClickProviderProps {
  children: React.ReactNode;
}

export const ClickProvider: React.FC<ClickProviderProps> = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [id, setID]=useState<string>('');


  return (
    <ClickContext.Provider value={{ isClicked, setIsClicked, id, setID}}>
      {children}
    </ClickContext.Provider>
  );
};
