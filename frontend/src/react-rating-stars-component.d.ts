declare module 'react-rating-stars-component' {
    const ReactStars: React.ComponentType<{
        count?: number;
        value?: number;
        size?: number;
        activeColor?: string;
        isHalf?: boolean;
        onChange?: (newValue: number) => void;
    }>;
    export default ReactStars;
}
