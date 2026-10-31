// A drawn mini-website used as a light placeholder until real sample screenshots exist.
// Pure CSS, no image download, so it costs almost nothing on slow internet.
export function SampleMockup({
  name,
  color,
  className = "",
}: {
  name: string;
  color: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`overflow-hidden rounded-2xl border border-line bg-white shadow-md ${className}`}>
      <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
      </div>
      <div className="px-4 py-5 text-white" style={{ backgroundColor: color }}>
        <p className="text-lg font-extrabold leading-tight">{name}</p>
        <div className="mt-2 h-2 w-3/4 rounded bg-white/60" />
        <div className="mt-1.5 h-2 w-1/2 rounded bg-white/40" />
        <div className="mt-4 inline-block rounded-md bg-white px-3 py-1.5">
          <div className="h-2 w-12 rounded" style={{ backgroundColor: color }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg bg-gray-100 p-2">
            <div className="h-8 rounded" style={{ backgroundColor: color, opacity: 0.25 + i * 0.15 }} />
            <div className="mt-1.5 h-1.5 rounded bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
