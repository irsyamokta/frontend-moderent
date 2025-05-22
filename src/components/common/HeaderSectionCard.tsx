import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import Button from "../ui/button/Button";

interface HeaderSectionProps {
    title?: string;
    buttonLabel?: string;
    to?: string;
    showButton?: boolean;
    onButtonClick?: () => void;
    showSecondButton?: boolean;
    secondButtonLabel?: string;
    onSecondButtonClick?: () => void;
}

const HeaderSection = ({
    title = "Judul",
    buttonLabel = "Buat",
    to,
    showButton = true,
    onButtonClick,
    showSecondButton = false,
    secondButtonLabel = "Tambah",
    onSecondButtonClick,
}: HeaderSectionProps) => {
    return (
        <div className="flex justify-between items-center rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">
                {title}
            </h1>

            {showButton && (
                <div className="flex gap-2">
                    {to && (
                        <Link to={to}>
                            <Button variant="default" size="sm">
                                <LuPlus />
                                <span>{buttonLabel}</span>
                            </Button>
                        </Link>
                    )}
                    {onButtonClick && (
                        <Button variant="default" size="sm" onClick={onButtonClick}>
                            <LuPlus />
                            <span>{buttonLabel}</span>
                        </Button>
                    )}
                    {showSecondButton && onSecondButtonClick && (
                        <Button variant="outline" size="sm" onClick={onSecondButtonClick}>
                            {secondButtonLabel}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default HeaderSection;
