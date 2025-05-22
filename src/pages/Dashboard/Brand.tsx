import BrandCard from "../../components/cards/BrandCard";
import PageMeta from "../../components/common/PageMeta";

export default function Brand() {
    return (
        <>
            <PageMeta
                title="Brand"
                description="Lihat semua brand yang tersedia."
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <BrandCard />
                </div>
            </div>
        </>
    );
}
