import PageMeta from "../../components/common/PageMeta";
import ResetPasswordForm from "../../components/password/ResetPasswordForm";

export default function ResetPassword() {
    return (
        <>
            <PageMeta
                title="Reset Password"
                description="Reset Password"
            />
            <div>   
                <div className="space-y-6">
                    <ResetPasswordForm />
                </div>
            </div>
        </>
    );
}
