import { useState, useEffect } from 'react';
import { LuWifiOff } from 'react-icons/lu';

interface UseImageWithFallbackProps {
    thumbnail: string;
    title: string;
    isGallery?: boolean;
    className?: string;
    fallbackClassName?: string;
}

const useImageWithFallback = ({
    thumbnail,
    title,
    isGallery = false,
    className = '',
    fallbackClassName = '',
}: UseImageWithFallbackProps) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isImageError, setIsImageError] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleImageError = () => {
        setIsImageError(true);
    };

    const getImageContent = () => {
        const fallbackBaseClass = `w-full flex items-center justify-center ${
            isGallery ? 'bg-gray-100 shadow-lg border p-10' : 'bg-transparent'
        } ${fallbackClassName}`;

        if (!thumbnail || isImageError) {
            return (
                <div className={fallbackBaseClass}>
                    <img src="../src/assets/img/img-user.png" className="w-14" alt="user" />
                </div>
            );
        }

        if (!isOnline) {
            return (
                <div className={fallbackBaseClass}>
                    <LuWifiOff size={50} />
                </div>
            );
        }

        return (
            <img
                src={thumbnail}
                alt={title}
                className={`${className}`}
                onError={handleImageError}
            />
        );
    };

    return getImageContent();
};

export default useImageWithFallback;