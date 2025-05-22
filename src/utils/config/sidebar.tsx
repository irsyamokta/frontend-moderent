import { LuLayoutDashboard, LuUsers, LuCrown, LuCar } from "react-icons/lu";

export const AdminNavItems = [
    {
        icon: <LuLayoutDashboard />,
        name: "Dashboard",
        path: "/admin",
    },
    {
        icon: <LuUsers />,
        name: "Pengguna",
        path: "/admin/pengguna",
    },
    {
        icon: <LuCrown />,
        name: "Brand",
        path: "/admin/brand",
    },
    {
        icon: <LuCar />,
        name: "Kendaraan",
        path: "/admin/kendaraan",
    },
];
