import { z } from "zod";

export const vehicleSchema = z.object({
    name: z.string()
        .min(2, { message: "Nama kendaraan minimal 2 karakter!" })
        .max(100, { message: "Nama kendaraan maksimal 100 karakter!" }),

    type: z.string()
        .min(2, { message: "Tipe kendaraan minimal 2 karakter!" })
        .max(50, { message: "Tipe kendaraan maksimal 50 karakter!" }),

    price: z.string({ required_error: "Harga wajib diisi" })
        .min(0, { message: "Harga tidak boleh kurang dari 0!" }),

    status: z.string({ required_error: "Status wajib diisi" }),

    year: z.string({ required_error: "Tahun wajib diisi" }),

    seat: z.string({ required_error: "Jumlah kursi wajib diisi" })
        .min(1, { message: "Jumlah kursi minimal 1!" }),

    horsepower: z.string({ required_error: "Horse power wajib diisi" })
        .min(1, { message: "Horse power minimal 1!" }),

    description: z.string({ required_error: "Deskripsi wajib diisi" })
        .min(10, { message: "Deskripsi minimal 10 karakter!" }),

    spesification: z.string({ required_error: "Spesifikasi wajib diisi" })
        .min(5, { message: "Spesifikasi minimal 5 karakter!" }),

    brandId: z.string()
        .uuid({ message: "ID brand harus berupa UUID yang valid!" }),
});
