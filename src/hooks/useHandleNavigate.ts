import { useNavigate } from "react-router-dom";
import { useHeader } from "../context/HeaderContext";

export const useHandleNavigate = () => {
    const navigate = useNavigate();
    const { isMobile, setMenuOpen } = useHeader();

    const handleNavigate = (path: string) => {
        if (path.startsWith("#")) {
            const elementId = path.slice(1);
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
            if (isMobile) setMenuOpen(false);
        } else {
            navigate(path);
            if (isMobile) setMenuOpen(false);
        }
    };

    return handleNavigate;
};
