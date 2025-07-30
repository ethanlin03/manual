import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const UserContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in with UID:", user.uid);
        setUserId(user.uid);
      } else {
        console.log("User signed out");
        setUserId('');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={[userId, setUserId]}>
      {children}
    </UserContext.Provider>
  );
}
