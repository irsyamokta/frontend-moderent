import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserMetaCard from "../../components/profile/UserMetaCard";
import UserInfoCard from "../../components/profile/UserInfoCard";
import UserPasswordCard from "../../components/profile/UserPasswordCard";
import PageMeta from "../../components/common/PageMeta";

export default function UserProfile() {
  return (
    <>
      <PageMeta
        title="Profile"
        description="Lihat dan ubah informasi akun Anda."
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserPasswordCard />
        </div>
      </div>
    </>
  );
}
