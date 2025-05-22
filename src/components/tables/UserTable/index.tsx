import { useState, useMemo } from "react";
import useSWR from "swr";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { getUsers, deleteUser } from "../../../services/userService";

import type { IUser } from "../../../types";

import UsersTableHeader from "./UsersTableHeader";
import UsersTableRow from "./UsersTableRow";
import { Table, TableBody } from "../../ui/table";

import { EmptyTable } from "../EmptyTable";
import { confirmDialog } from "../../../utils/confirmationAlert";

import SearchFilter from "../../common/SearchFilter";
import Pagination from "../../common/Pagination";

export default function UsersTable() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");

    const limit = 10;

    const fetchUsers = async (page: number, limit: number) => {
        const response = await getUsers({ page, limit });

        return {
            users: Array.isArray(response.users) ? response.users : [],
            total: response.total ?? 0,
        };
    };

    const {
        data = { users: [], total: 0 },
        mutate: mutateUsers,
        isLoading,
    } = useSWR(['usersRole', page, limit], () => fetchUsers(page, limit));

    const users: IUser[] = data.users;
    const totalUsers: number = data.total;

    const filteredUsers = useMemo(() => {
        return users.filter((user: IUser) => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                user.name.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower);
            const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, roleFilter]);

    const handleDelete = async (id: string) => {
        const confirmed = await confirmDialog({
            title: "Hapus Pengguna",
            text: "Apakah Anda yakin ingin menghapus pengguna ini?",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        });
        if (!confirmed) return;

        try {
            await deleteUser(id);
            toast.success("Berhasil menghapus pengguna!");
            mutateUsers();
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-6 gap-2">
                    <h2 className="text-base font-semibold">Daftar Pengguna</h2>
                    <SearchFilter
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        searchPlaceholder="Cari nama atau email..."
                        filterValue={roleFilter}
                        onFilterChange={setRoleFilter}
                        filterLabel="Role"
                        filterOptions={[
                            { value: "ALL", label: "Semua Role" },
                            { value: "ADMIN", label: "Admin" },
                            { value: "CLIENT", label: "Client" },
                        ]}
                    />
                </div>
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        {/* Table Header */}
                        <UsersTableHeader />

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {filteredUsers.length === 0 && !isLoading ? (
                                <EmptyTable colspan={5} description="Tidak ada data pengguna" />
                            ) : (
                                filteredUsers.map((user: IUser) => (
                                    <UsersTableRow key={user.id} user={user} onDelete={handleDelete} />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end py-1 px-4 lg:px-8 mb-3">
                    {totalUsers > limit && (
                        <Pagination
                            currentPage={page}
                            totalItems={totalUsers}
                            itemsPerPage={limit}
                            onPageChange={setPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}