import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { changePassword } from "../../services/passwordService";

import { passswordSchema } from "../../utils/validators/passwordValidator";

import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Pencil } from "lucide-react";


export default function UserPasswordCard() {
    const { isOpen, openModal, closeModal } = useModal();
    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof passswordSchema>>({
        resolver: zodResolver(passswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
    })

    useEffect(() => {
        if (user) {
            reset({
                currentPassword: "",
                newPassword: "",
            });
        }
    }, [user, reset]);

    const handleSave = async (data: z.infer<typeof passswordSchema>) => {
        setIsLoading(true);

        const payload = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        }

        try {
            await changePassword(payload);
            reset();
            closeModal();
            toast.success("Password berhasil diperbarui!");
        } catch (error) {
            closeModal();
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Ubah Password
                    </h4>
                    <button
                        onClick={openModal}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                        <Pencil className="w-4 h-4" />
                        Ubah
                    </button>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Ubah Password</h4>
                    </div>

                    <form id="change-password-form" className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
                        <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                            <div className="mt-7">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    {/* Current Password */}
                                    <div className="col-span-2">
                                        <Label>Password Saat Ini</Label>
                                        <div className="relative">
                                            <Input {...register("currentPassword")} type={showCurrentPassword ? "text" : "password"} placeholder="Password saat ini"/>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowCurrentPassword(!showCurrentPassword)
                                                }
                                                className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700"
                                                tabIndex={-1}
                                            >
                                                {showCurrentPassword ? (
                                                    <AiFillEyeInvisible />
                                                ) : (
                                                    <AiFillEye />
                                                )}
                                            </button>
                                        </div>
                                        {errors.currentPassword && <p className="text-xs text-red-500 mt-2">{errors.currentPassword.message}</p>}
                                    </div>

                                    {/* New Password */}
                                    <div className="col-span-2">
                                        <Label>Password Baru</Label>
                                        <div className="relative">
                                            <Input {...register("newPassword")} type={showNewPassword ? "text" : "password"} placeholder="Password baru"/>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowNewPassword(!showNewPassword)
                                                }
                                                className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700"
                                                tabIndex={-1}
                                            >
                                                {showNewPassword ? (
                                                    <AiFillEyeInvisible />
                                                ) : (
                                                    <AiFillEye />
                                                )}
                                            </button>
                                        </div>
                                        {errors.newPassword && <p className="text-xs text-red-500 mt-2">{errors.newPassword.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" type="button" onClick={closeModal} disabled={isLoading}>
                                Batal
                            </Button>
                            <Button size="sm" type="submit" variant="default" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                                        Loading...
                                    </>
                                ) : (
                                    "Simpan Perubahan"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
