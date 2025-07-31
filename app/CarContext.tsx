import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/FirebaseConfig";

export type Car = {
	index: number;
	name: string;
	desc: string;
	mileage: string;
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
			const userCarsSnap = await getDoc(userCarRef);
			if (userCarsSnap.exists()) {
				const userCarsArr = userCarsSnap.data().cars || []

				const arr = userCarsArr.map((car: any, i: number) => ({
					index: i,
					name: car.name,
					desc: car.year + " " + car.make + " " + car.model,
					mileage: car.mileage,
					image: car.image,
					alerts: car.alerts
				}));
				setCars(arr);
			}
        }
        
        fetchCars();
    }, [userId]);

    return (
        <CarContext.Provider value={[cars, setCars]}>
            {children}
        </CarContext.Provider>
    );
}