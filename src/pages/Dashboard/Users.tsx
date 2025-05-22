import PageMeta from "../../components/common/PageMeta";
import UsersTable from "../../components/tables/UserTable";

export default function Users() {
    return (
        <>
            <PageMeta
                title="Pengguna"
                description="Lihat semua pengguna yang terdaftar."
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <UsersTable />
                </div>
            </div>
        </>
    );
}
