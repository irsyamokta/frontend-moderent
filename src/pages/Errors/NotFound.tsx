import { Link } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";

import NotFoundImage from "/src/assets/img/img-404.png";

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Not Found"
        description="Halaman tidak ditemukan"
      />
      <div className="flex flex-col items-center justify-center p-6 overflow-hidden z-1 h-screen">
        <div className="mx-auto w-full max-w-[420px] text-center">
          <img src={NotFoundImage} alt="404" className="-mt-20" />
          <p className="mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Maaf, halaman yang Anda cari tidak ditemukan.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-primary px-5 py-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-primary/80 hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Kembali ke Beranda
          </Link>
        </div>
        {/* <!-- Footer --> */}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-10">
          &copy; {new Date().getFullYear()} - Moderent
        </p>
      </div>
    </>
  );
}
