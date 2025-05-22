import useSWR from "swr";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { vehicleSchema } from "../../utils/validators/vehicleValidator";
import { createVehicle, updateVehicle } from "../../services/vehicleService";
import { getBrands } from "../../services/brandService";

import type { IBrand, IVehicle } from "../../types";

import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import Select from "../form/Select";
import TextArea from "../form/input/TextArea";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface VehicleModalFormProps {
    mutateData: () => void;
    initialData?: IVehicle | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalVehicleForm = ({
    mutateData,
    initialData,
    isOpen,
    onClose,
}: VehicleModalFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { data: brands} = useSWR("brandOption", getBrands);

    const brandOptions = brands?.map((brand: IBrand) => ({
        value: brand.id,
        label: brand.name,
    }));

    const typeOptions = [
        { value: "Mobil", label: "Mobil" },
        { value: "Motor", label: "Motor" },
    ];

    const statusOptions = [
        { value: "Available", label: "Available" },
        { value: "Unavailable", label: "Unavailable" },
        { value: "Rented", label: "Rented" },
    ];

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof vehicleSchema>>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            name: "",
            type: "",
            price: "",
            status: "",
            year: "",
            seat: "",
            horsepower: "",
            description: "",
            spesification: "",
            brandId: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                type: initialData.type,
                price: initialData.price.toString(),
                status: initialData.status,
                year: initialData.year.toString(),
                seat: initialData.seat.toString(),
                horsepower: initialData.horse_power.toString(),
                description: initialData.description,
                spesification: initialData.spesification,
                brandId: initialData.brand.id,
            });
        } else {
            reset({
                name: "",
                type: "",
                price: "",
                status: "",
                year: "",
                seat: "",
                horsepower: "",
                description: "",
                spesification: "",
                brandId: "",
            });
        }
    }, [initialData, reset]);

    const onSubmit = async (data: z.infer<typeof vehicleSchema>) => {
        try {
            if (!initialData && !imageFile) {
                onClose();
                toast.error("Thumbnail tidak boleh kosong!");
                return;
            }
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("type", data.type);
            formData.append("price", data.price.toString());
            formData.append("status", data.status);
            formData.append("year", data.year.toString());
            formData.append("seat", data.seat.toString());
            formData.append("horsepower", data.horsepower.toString());
            formData.append("description", data.description);
            formData.append("spesification", data.spesification);
            formData.append("brandId", data.brandId);

            if (imageFile) {
                formData.append("file", imageFile);
            }

            if (initialData) {
                await updateVehicle(initialData.id, formData);
                mutateData();
                onClose();
                toast.success("Kendaraan berhasil diperbarui!");
            } else {
                await createVehicle(formData);
                mutateData();
                onClose();
                toast.success("Kendaraan berhasil ditambahkan!");
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
            <div className="no-scrollbar relative w-full max-w-[700px] max-h-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
                <h4 className="text-2xl font-semibold mb-4">
                    {initialData ? "Edit Kendaraan" : "Tambah Kendaraan"}
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
                        <Label>Nama Kendaraan</Label>
                        <Input {...register("name")} placeholder="Masukkan nama brand" />
                        {errors.name && <p className="text-sm text-red-500 mt-2">{errors.name.message}</p>}
                    </div>

                    <div>
                        <Label>Tipe</Label>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={typeOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="brandId">Brand</Label>
                        <Controller
                            name="brandId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={brandOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Pilih brand"
                                />
                            )}
                        />
                        {errors.brandId && <span className="text-xs text-red-500">{errors.brandId.message}</span>}
                    </div>

                    <div>
                        <Label>Harga</Label>
                        <Input {...register("price")} type="text" inputMode="numeric" min={0} placeholder="Masukkan harga kendaraan" className="no-spinner" />
                        {errors.price && <p className="text-sm text-red-500 mt-2">{errors.price.message}</p>}
                    </div>

                    <div>
                        <Label>Status</Label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={statusOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <Label>Tahun</Label>
                        <Input {...register("year")} type="text" inputMode="numeric" min={0} placeholder="Masukkan tahun kendaraan" className="no-spinner" />
                        {errors.year && <p className="text-sm text-red-500 mt-2">{errors.year.message}</p>}
                    </div>

                    <div>
                        <Label>Jumlah Kursi</Label>
                        <Input {...register("seat")} type="text" inputMode="numeric" min={0} placeholder="Masukkan jumlah kursi kendaraan" className="no-spinner" />
                        {errors.seat && <p className="text-sm text-red-500 mt-2">{errors.seat.message}</p>}
                    </div>

                    <div>
                        <Label>Horse Power</Label>
                        <Input {...register("horsepower")} type="text" inputMode="numeric" min={0} placeholder="Masukkan power kendaraan" className="no-spinner" />
                        {errors.horsepower && <p className="text-sm text-red-500 mt-2">{errors.horsepower.message}</p>}
                    </div>

                    <div>
                        <Label>Deskripsi</Label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <TextArea
                                    {...field}
                                    rows={4}
                                    error={!!errors.description}
                                    hint={errors.description?.message}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <Label>Spesifikasi</Label>
                        <Input {...register("spesification")} placeholder="Masukkan spesifikasi kendaraan" />
                        {errors.spesification && <p className="text-sm text-red-500 mt-2">{errors.spesification.message}</p>}
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