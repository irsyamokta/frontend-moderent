import { z } from "zod";

export const passswordSchema = z.object({
    currentPassword: z
        .string({ required_error: "Kata sandi lama wajib diisi" }),
    newPassword: z
        .string({ required_error: "kata sandi baru wajib diisi" })
        .min(8, "Konfirmasi kata sandi minimal 8 karakter")
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/,
            "Kata sandi harus mengandung huruf besar, huruf kecil, angka, dan simbol unik seperti @, #, $, %, &"
        ),
});
