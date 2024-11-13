import Image, { ImageProps } from 'next/image';

interface UnoptimizedImageProps extends ImageProps {}

const UnoptimizedImage = (UnoptimizedImageProps: UnoptimizedImageProps) => {
  return <Image {...UnoptimizedImageProps} unoptimized />;
};

export default UnoptimizedImage;
