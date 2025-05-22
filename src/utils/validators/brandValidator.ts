import { z } from "zod";

export const brandSchema = z.object({
    name: z
        .string({required_error: "Nama wajib diisi"})
        .nonempty({ message: "Nama tidak boleh kosong!" })
        .min(3, { message: "Nama minimal harus 3 karakter!" })
        .max(50, { message: "Nama maksimal 50 karakter!" }),
});