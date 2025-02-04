interface AzureImageProps {
    imageUrl: string;
    className?: string;
}

export const AzureImage = ({ imageUrl, className }: AzureImageProps) => {

    return (
        <img
            src={imageUrl}
            alt="Item preview"
            className={`object-contain mb-2 ${className}`}
            loading="lazy"
            onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-item.webp';
            }}
        />
    );
};