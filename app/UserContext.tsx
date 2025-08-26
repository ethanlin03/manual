import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/FirebaseConfig';

type UserContextType = {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  firstTime: boolean;
  setFirstTime: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextType>({
  userId: '',
  setUserId: () => {},
  firstTime: false,
  setFirstTime: () => {},
});

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>('');
  const [firstTime, setFirstTime] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User signed in with UID:", user.uid);
        setUserId(user.uid);
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if(userDocSnap.exists()) {
          const data = userDocSnap.data();
          setFirstTime(data.firstTime ?? false);
        } else {
          console.log("No user doc found in Firestore");
          setFirstTime(false);
        }
      } else {
        console.log("User signed out");
        setUserId('');
        setFirstTime(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, firstTime, setFirstTime }}>
      {children}
    </UserContext.Provider>
  );
}
