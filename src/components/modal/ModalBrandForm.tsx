import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { brandSchema } from "../../utils/validators/brandValidator";
import { createBrand, updateBrand } from "../../services/brandService";

import type { IBrand } from "../../types";

import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ModalBrandFormProps {
    mutateData: () => void;
    initialData?: IBrand | null;
    isOpen: boolean;
    onClose: () => void;
}


export const ModalBrandForm = ({
    mutateData,
    initialData,
    isOpen,
    onClose,
}: ModalBrandFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof brandSchema>>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
            });
        } else {
            reset({
                name: "",
            });
        }
    }, [initialData, reset]);

    const onSubmit = async (data: z.infer<typeof brandSchema>) => {
        try {
            if (!initialData && !imageFile) {
                onClose();
                toast.error("Thumbnail tidak boleh kosong!");
                return;
            }
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", data.name);
            if (imageFile) {
                formData.append("file", imageFile);
            }

            if (initialData) {
                await updateBrand(initialData.id, formData);
                mutateData();
                onClose();
                toast.success("Brand berhasil diperbarui!");
            } else {
                await createBrand(formData);
                mutateData();
                onClose();
                toast.success("Brand berhasil ditambahkan!");
                reset();
            }

            mutateData();
            onClose();
            setImageFile(null);
        } catch (error) {
            if (error instanceof AxiosError) {
                onClose();
                toast.error(error.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl">
                <h4 className="text-2xl font-semibold mb-4">
                    {initialData ? "Edit Brand" : "Tambah Brand"}
                </h4>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label>Thumbnail</Label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setImageFile(file);
                            }}
                            className="file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/80"
                        />
                    </div>

                    <div>
                        <Label>Nama Brand</Label>
                        <Input {...register("name")} placeholder="Masukkan nama brand" />
                        {errors.name && <p className="text-sm text-red-500 mt-2">{errors.name.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Batal
                        </Button>
                        <Button type="submit" variant="default" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                                    Loading...
                                </>
                            ) : initialData ? "Simpan Perubahan" : "Simpan"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
