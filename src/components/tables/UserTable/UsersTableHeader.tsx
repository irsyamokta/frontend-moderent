import { TableHeader, TableRow, TableCell } from "../../ui/table";

export default function UsersTableHeader() {
    return (
        <TableHeader className="border-t border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-700 text-start text-sm">
                    Pofile
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-700 text-start text-sm">
                    Nama Lengkap
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-700 text-start text-sm">
                    Email
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-700 text-start text-sm">
                    Telepon
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-700 text-start text-sm">
                    Role
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-700 text-start text-sm">
                    Aksi
                </TableCell>
            </TableRow>
        </TableHeader>
    );
}