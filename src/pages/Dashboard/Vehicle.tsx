import PageMeta from "../../components/common/PageMeta";
import VehicleTable from "../../components/tables/VehicleTable";

export default function Vehicle() {
    return (
        <>
            <PageMeta
                title="Kendaraan"
                description="Lihat semua kendaraan yang tersedia."
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <VehicleTable />
                </div>
            </div>
        </>
    );
}
