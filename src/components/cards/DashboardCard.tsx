import useSWR from "swr";

import { getBrands } from "../../services/brandService";
import { getVehicles } from "../../services/vehicleService";

import { LuCrown, LuCar, LuBike } from "react-icons/lu";
import { IoIosBus } from "react-icons/io";

import Card from "./basic/Card";


export default function DashboardCard() {

    const { data: brands } = useSWR("brands", getBrands);
    const { data: vehicles } = useSWR("vehicles", getVehicles);

    console.log(vehicles)

    const totalBrans = brands?.length || 0;
    const totalVehicles = vehicles?.total || 0;
    const totalCars = vehicles?.vehicles?.filter((vehicle: any) => vehicle.type === "Mobil").length || 0;
    const totalMotors = vehicles?.vehicles?.filter((vehicle: any) => vehicle.type === "Motor").length || 0;
    
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
            <Card icon={<LuCrown size={24} />} label="Total Brand" value={totalBrans} />
            <Card icon={<IoIosBus size={24} />} label="Total Kendaraan" value={totalVehicles} />
            <Card icon={<LuCar size={24} />} label="Total Mobil" value={totalCars} />
            <Card icon={<LuBike size={24} />} label="Total Motor" value={totalMotors} />
        </div>
    );
}