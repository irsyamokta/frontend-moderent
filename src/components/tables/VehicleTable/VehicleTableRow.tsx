import { useBrandName } from "../../../hooks/useBrandName";
import type { IVehicle } from "../../../types";

import Badge from "../../ui/badge/Badge";
import { TableCell, TableRow } from "../../ui/table";
import { Pencil, Trash2 } from "lucide-react";

type BadgeColor =
    | "success"
    | "error"
    | "warning"

const statusColorMap: Record<string, BadgeColor> = {
    ['Available']: 'success',
    ['Unavailable']: 'error',
    ['Rented']: 'warning',
};

interface Props {
    vehicle: IVehicle;
    onEdit: (id: any) => void;
    onDelete: (id: string) => void;
}

export default function VehicleTableRow({ vehicle, onEdit, onDelete }: Props) {
    const { name: brandName } = useBrandName(vehicle.brand.id);

    return (
        <TableRow key={vehicle.id}>
            <TableCell className="px-5 py-4">
                <div className="w-24 overflow-hidden rounded">
                    <img
                        src={vehicle.imageUrl}
                        alt={vehicle.name}
                    />
                </div>
            </TableCell>

            <TableCell className="px-5 py-3 text-sm max-w-[200px] truncate">{vehicle.name}</TableCell>
            <TableCell className="px-5 py-3 text-sm">{brandName}</TableCell>
            <TableCell className="px-5 py-3 text-sm">{vehicle.type}</TableCell>
            <TableCell className="px-5 py-3 text-sm whitespace-nowrap">Rp {vehicle.price.toLocaleString()}</TableCell>
            <TableCell className="px-5 py-3 text-sm">{vehicle.year}</TableCell>
            <TableCell className="px-5 py-3 text-sm">{vehicle.seat}</TableCell>
            <TableCell className="px-5 py-3 text-sm">{vehicle.horse_power}</TableCell>
            <TableCell className="px-5 py-3 text-sm max-w-[250px] truncate" title={vehicle.description}>
                {vehicle.description}
            </TableCell>
            <TableCell className="px-5 py-3 text-sm max-w-[200px] truncate">{vehicle.spesification}</TableCell>
            <TableCell className="px-5 py-3 text-sm">
                <Badge color={statusColorMap[vehicle.status]}>{vehicle.status}</Badge>
            </TableCell>

            <TableCell className="px-5 py-3">
                <div className="flex gap-2">
                    <button onClick={() => onEdit(vehicle)} title="Edit">
                        <Pencil className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                    </button>
                    <button onClick={() => onDelete(vehicle.id)} title="Delete">
                        <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                    </button>
                </div>
            </TableCell>
        </TableRow>
    );
}