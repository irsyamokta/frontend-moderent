import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email wajib diisi" })
        .email("Format email tidak valid"),

    password: z
        .string({ required_error: "Kata sandi wajib diisi" })
});

export const registerSchema = z
    .object({
        name: z
            .string({ required_error: "Nama wajib diisi" })
            .min(3, "Nama minimal terdiri dari 3 karakter"),

        email: z
            .string({ required_error: "Email wajib diisi" })
            .email("Format email tidak valid"),

        phone: z
            .string({ required_error: "Nomor telepon wajib diisi" })
            .min(10, "Nomor telepon minimal terdiri dari 10 karakter")
            .max(15, "Nomor telepon maksimal terdiri dari 15 karakter"),

        password: z
            .string({ required_error: "Kata sandi wajib diisi" })
            .min(8, "Kata sandi minimal 8 karakter")
            .regex(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                "Kata sandi harus mengandung huruf besar, huruf kecil, dan angka"
            ),

        passwordConfirmation: z
            .string({ required_error: "Konfirmasi kata sandi wajib diisi" })
            .min(8, "Konfirmasi kata sandi minimal 8 karakter")
            .regex(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                "Konfirmasi kata sandi harus mengandung huruf besar, huruf kecil, dan angka"
            ),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "Konfirmasi kata sandi tidak cocok dengan kata sandi",
    });
