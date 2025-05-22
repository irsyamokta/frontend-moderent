import { z } from "zod";

export const updateProfileValidator = z.object({
    name: z
        .string()
        .nonempty({ message: "Nama tidak boleh kosong!" })
        .min(3, { message: "Nama minimal harus 3 karakter!" })
        .max(50, { message: "Nama maksimal 50 karakter!" }),

    email: z
        .string()
        .nonempty({ message: "Email tidak boleh kosong!" })
        .email({ message: "Format email tidak valid!" }),

    phone: z
        .string()
        .nonempty({ message: "Nomor telepon tidak boleh kosong!" })
        .min(10, { message: "Nomor telepon minimal harus 10 karakter!" })
        .max(15, { message: "Nomor telepon maksimal 15 karakter!" }),
});