import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="SignUp Admin"
        description="Daftar sebagai admin untuk mengelola konten dan data. Akses mudah ke berbagai fitur melalui halaman login yang aman dan cepat."
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
