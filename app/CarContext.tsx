import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/FirebaseConfig";

export type Car = {
	index: number;
	name: string;
	desc: string;
	mileage: string;
	annualMileage: string;
	image: any; 
	alerts: number;
};

export const CarContext = createContext<[Car[], React.Dispatch<React.SetStateAction<Car[]>>]>([[], () => {}]);

export default function CarProvider({ children }: { children: React.ReactNode }) {
    const [cars, setCars] = useState<Car[]>([]);
    const [userId, setUserId] = useContext(UserContext);

    useEffect(() => {
        const fetchCars = async() => {
            const userCarRef = doc(db, "cars", userId);
			const unsubscribe = onSnapshot(userCarRef, (userCarSnap) => {
				if (userCarSnap.exists()) {
					const userCarsArr = userCarSnap.data().cars || []

					const arr = userCarsArr.map((car: any, i: number) => ({
						index: i,
						name: car.name,
						desc: car.year + " " + car.make + " " + car.model,
						mileage: car.mileage,
						annualMileage: car.annualMileage,
						image: car.image,
						alerts: car.alerts
					}));
					setCars(arr);
				}
			})
			return () => unsubscribe();
        }
        
        fetchCars();
    }, [userId]);

    return (
        <CarContext.Provider value={[cars, setCars]}>
            {children}
        </CarContext.Provider>
    );
}