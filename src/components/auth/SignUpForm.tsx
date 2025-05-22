import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { registerSchema } from "../../utils/validators/authValidator";
import { signup } from "../../services/authService";

import { AiOutlineLoading3Quarters, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  useEffect(() => {
    reset({
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
    });
  }, [reset]);

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true);

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    };

    try {
      await signup(payload);
      toast.success("Berhasil register!");
      reset();
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Daftar Moderent
            </h1>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <Label>Nama Lengkap<span className="text-error-500">*</span></Label>
                <Input
                  placeholder="Masukan nama lengkap anda"
                  {...register("name")}
                />
                {errors.name?.message && (
                  <p className="text-xs text-error-500 mt-2">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label>Email <span className="text-error-500">*</span></Label>
                <Input
                  placeholder="Masukan email anda"
                  {...register("email")}
                  type="email"
                  error={!!errors.email}
                  hint={errors.email?.message}
                />
              </div>

              {/* Phone */}
              <div>
                <Label>Nomor Telepon <span className="text-error-500">*</span></Label>
                <Input
                  placeholder="Masukan nomor telepon anda"
                  {...register("phone")}
                  type="tel"
                  error={!!errors.phone}
                  hint={errors.phone?.message}
                />
              </div>

            {/* Password */}
            <div>
              <Label>Password <span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukan password anda"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible />
                  ) : (
                    <AiFillEye />
                  )}
                </button>
              </div>
              {errors.password?.message && (
                <p className="mt-1 text-xs text-error-500">{errors.password.message}</p>
              )}
            </div>

            {/* Password Confirmation */}
            <div>
              <Label>Konfirmasi Password <span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input
                  type={showPasswordConfirmation ? "text" : "password"}
                  placeholder="Masukan password konfirmasi"
                  {...register("passwordConfirmation")}
                  error={!!errors.passwordConfirmation}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                  className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPasswordConfirmation ? (
                    <AiFillEyeInvisible />
                  ) : (
                    <AiFillEye />
                  )}
                </button>
              </div>
              {errors.passwordConfirmation?.message && (
                <p className="text-xs text-error-500 mt-2">{errors.passwordConfirmation.message}</p>
              )}
            </div>

            <Button type="submit" variant="default" disabled={isLoading} className="w-full ">
              {isLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}