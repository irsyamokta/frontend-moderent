import PageMeta from "../../components/common/PageMeta";
import ForgotPasswordForm from "../../components/password/ForgotPasswordForm";

export default function ForgotPassword() {
    return (
        <>
            <PageMeta
                title="Lupa Password"
                description="Lupa Password"
            />
            <div>   
                <div className="space-y-6">
                    <ForgotPasswordForm />
                </div>
            </div>
        </>
    );
}
