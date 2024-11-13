import Image, { ImageProps } from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UnoptimizedImageProps extends ImageProps {}

const UnoptimizedImage = (props: UnoptimizedImageProps) => {
  return <Image {...props} unoptimized alt={props.alt ? props.alt : "Imagem sem legenda"} />;
};

export default UnoptimizedImage;
