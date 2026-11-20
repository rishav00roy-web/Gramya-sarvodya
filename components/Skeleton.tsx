/* A placeholder in the shape of what is coming, while it loads from the
   database: a few soft bars that shimmer (still, when the device asks for
   less motion). The words are read out but not shown. */
export default function Skeleton({
  label = "Loading…",
  lines = 3,
}: {
  label?: string;
  lines?: number;
}) {
  return (
    <div className="skeleton" role="status">
      <span className="visually-hidden">{label}</span>
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="skeleton__bar" aria-hidden="true" />
      ))}
    </div>
  );
}
