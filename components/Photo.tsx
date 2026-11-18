import { photoSrc, photoSrcSet, type Photo as PhotoData } from "@/lib/photos";

/* An Unsplash photograph cropped on Unsplash's side to the box's own shape
   (w by h), offered at several widths so a phone never loads a desktop
   picture. The box keeps that shape with aspect-ratio and object-fit. */
export default function Photo({
  photo,
  w,
  h,
  sizes,
  className,
  priority = false,
}: {
  photo: PhotoData;
  w: number;
  h: number;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className ? `photo ${className}` : "photo"}
      src={photoSrc(photo, w, h)}
      srcSet={photoSrcSet(photo, w, h)}
      sizes={sizes}
      width={w}
      height={h}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
