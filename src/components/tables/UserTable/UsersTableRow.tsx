import { TableCell, TableRow } from "../../ui/table";
import { Trash2 } from "lucide-react";

interface Props {
    user: any;
    onDelete: (id: string) => void;
}

export default function UsersTableRow({ user, onDelete }: Props) {
    return (
        <TableRow key={user.id}>
            <TableCell className="px-5 py-4 sm:px-6 text-start">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                            width={40}
                            height={40}
                            src={user.imageUrl || "../src/assets/img/img-user.png"}
                            alt={user.name}
                        />
                    </div>
                </div>
            </TableCell>

            <TableCell
                className="px-5 py-3 text-gray-500 text-start text-theme-sm max-w-[200px] truncate"
                title={user.name}
            >
                {user.name}
            </TableCell>

            <TableCell
                className="px-5 py-3 text-gray-500 text-start text-theme-sm"
                title={user.email}
            >
                {user.email}
            </TableCell>

            <TableCell
                className="px-5 py-3 text-gray-500 text-start text-theme-sm"
                title={user.phone}
            >
                {user.phone}
            </TableCell>

            <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm whitespace-nowrap">
                {user.role}
            </TableCell>

            <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onDelete(user.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Hapus pengguna"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </TableCell>
        </TableRow>
    )
}