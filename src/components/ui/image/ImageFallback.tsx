import useImageWithFallback from "../../../hooks/useImageWithFallback";

interface ImageFallbackProps {
    src: string;
    alt: string;
    isGallery?: boolean;
    className?: string;
    fallbackClassName?: string;
}

export default function ImageFallback({
    src,
    alt,
    isGallery = false,
    className = '',
    fallbackClassName = '',
}: ImageFallbackProps) {
    const thumbnail = useImageWithFallback({
        thumbnail: src,
        title: alt,
        isGallery,
        className,
        fallbackClassName,
    });

    return thumbnail;
}
