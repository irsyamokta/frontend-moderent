import useSWR from "swr";
import { useMemo, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { getVehicles, deleteVehicle } from "../../../services/vehicleService";

import type { IVehicle } from "../../../types";

import { ModalVehicleForm } from "../../modal/ModalVehicleForm";
import {
    Table,
    TableBody,
} from "../../ui/table";

import { confirmDialog } from "../../../utils/confirmationAlert";

import HeaderSection from "../../common/HeaderSectionCard";
import { EmptyTable } from "../EmptyTable";
import VehicleTableRow from "./VehicleTableRow";
import VehicleTableHeader from "./VehicleTableHeader";
import Pagination from "../../common/Pagination";
import SearchFilter from "../../common/SearchFilter";

interface TableProps {
    showHeader?: boolean
}

export default function VehicleTable({ showHeader = true }: TableProps) {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<IVehicle | null>(null);

    const limit = 10;

    const fetchVehicles = async (page: number, limit: number) => {
        const response = await getVehicles({ page, limit });
        return {
            vehicles: Array.isArray(response.vehicles) ? response.vehicles : [],
            total: response.total ?? 0
        };
    };

    const {
        data = { vehicles: [], total: 0 },
        mutate: mutateData
    } = useSWR(['vehicles', page, limit], () => fetchVehicles(page, limit));

    const vehicles: IVehicle[] = data.vehicles;
    const totalVehicles: number = data.total;

    const filteredVehicles = useMemo(() => {
        return vehicles.filter((vehicle: IVehicle) => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                vehicle.name.toLowerCase().includes(searchLower)

            const matchesRole = statusFilter === 'ALL' || vehicle.status === statusFilter;

            return matchesSearch && matchesRole;
        });
    }, [vehicles, searchTerm, statusFilter]);

    const handleCreate = () => {
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (data: IVehicle) => {
        setSelectedData(data);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        const confirmed = await confirmDialog({
            title: "Hapus Kendaraan",
            text: "Apakah Anda yakin ingin menghapus kendaraan ini?",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        });
        if (!confirmed) return;

        try {
            await deleteVehicle(id);
            mutateData();
            toast.success("Kendaraan berhasil dihapus!");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
            {/* Header */}
            {showHeader && <HeaderSection title="Kendaraan" buttonLabel="Tambah" onButtonClick={handleCreate} />}

            {/* Modal */}
            <ModalVehicleForm
                isOpen={isModalOpen}
                onClose={handleClose}
                initialData={selectedData}
                mutateData={mutateData}
            />

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-4 gap-2">
                    <h2 className="text-base font-semibold">Daftar Kendaraan</h2>
                    <SearchFilter
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        searchPlaceholder="Cari kendaraan..."
                        filterValue={statusFilter}
                        onFilterChange={setStatusFilter}
                        filterLabel="Status"
                        filterOptions={[
                            { value: "ALL", label: "Semua status" },
                            { value: "Available", label: "Available" },
                            { value: "Unavailable", label: "Unavailable" },
                            { value: "Rented", label: "Rented" },
                        ]}
                    />
                </div>
                <div className="max-w-full overflow-x-auto no-scrollbar">
                    <Table>
                        {/* Table Header */}
                        <VehicleTableHeader />

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {filteredVehicles.length === 0 ? (
                                <EmptyTable colspan={12} description="Tidak ada data berita" />
                            ) : (
                                filteredVehicles.map((vehicle: IVehicle) => (
                                    <VehicleTableRow
                                        key={vehicle.id}
                                        vehicle={vehicle}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end py-1 px-4 lg:px-8 mb-3">
                    {totalVehicles > limit && (
                        <Pagination
                            currentPage={page}
                            totalItems={totalVehicles}
                            itemsPerPage={limit}
                            onPageChange={setPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}