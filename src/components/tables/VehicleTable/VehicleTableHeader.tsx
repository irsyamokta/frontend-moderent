import { TableHeader, TableRow, TableCell } from "../../ui/table";

export default function VehicleTableHeader() {
    return (
        <TableHeader className="border-t border-b border-gray-100">
            <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm">Foto</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm whitespace-nowrap">Nama Kendaraan</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm">Brand</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm">Tipe</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm">Harga</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm">Tahun</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm whitespace-nowrap">Jumlah Kursi</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm whitespace-nowrap">Horse Power</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm">Deskripsi</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm">Spesifikasi</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm">Aksi</TableCell>
            </TableRow>
        </TableHeader>
    );
}