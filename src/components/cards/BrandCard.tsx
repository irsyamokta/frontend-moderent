import { useState } from "react";
import useSWR from "swr";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { getBrands, deleteBrand } from "../../services/brandService";
import { confirmDialog } from "../../utils/confirmationAlert";

import type { IBrand } from "../../types";

import { ModalBrandForm } from "../modal/ModalBrandForm";

import Button from "../ui/button/Button";
import HeaderSection from "../common/HeaderSectionCard";
import EmptyState from "../empty/EmptyState";

import { LuPencil, LuTrash2 } from "react-icons/lu";
import ImageFallback from "../ui/image/ImageFallback";


export default function BrandCard() {

    const { data: response = [], mutate: mutateData } = useSWR("brands", getBrands);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<IBrand | null>(null);

    const handleCreate = () => {
        setSelectedData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (data: IBrand) => {
        setSelectedData(data);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        const confirmed = await confirmDialog({
            title: "Hapus Brand",
            text: "Apakah Anda yakin ingin menghapus brand ini?",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        });
        if (!confirmed) return;

        try {
            await deleteBrand(id);
            mutateData();
            toast.success("Brand berhasil dihapus!");
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
            <HeaderSection title="Brand" buttonLabel="Tambah" onButtonClick={handleCreate} />

            {/* Modal */}
            <ModalBrandForm
                isOpen={isModalOpen}
                onClose={handleClose}
                initialData={selectedData}
                mutateData={mutateData}
            />

            {/* Cards */}
            {response.total === 0 && <EmptyState title="Belum ada data brand" />}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {response.map((item: IBrand) => (
                    <div
                        key={item.id}
                        className="flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden"
                    >
                        <div className="w-full h-48 overflow-hidden">
                            <ImageFallback src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" fallbackClassName="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 flex flex-col flex-1 justify-between">
                            {/* Judul */}
                            <div>
                                <h1 className="text-xl font-bold text-gray-800 line-clamp-1">{item.name}</h1>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex gap-2 mt-4">
                                <Button type="button" size="sm" variant="primary" onClick={() => handleEdit(item)}>
                                    <LuPencil />
                                </Button>
                                <Button type="button" size="sm" variant="danger" onClick={() => handleDelete(item.id)}>
                                    <LuTrash2 />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}