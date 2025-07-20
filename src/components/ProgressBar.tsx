export default function ProgressBar({ fillPercent }: { fillPercent: number }) {
  const safeFill = Math.min(Math.max(fillPercent, 0), 100)

  let fillColor = 'bg-green-500'
  if (safeFill > 80) {
    fillColor = 'bg-red-500'
  } else if (safeFill > 60) {
    fillColor = 'bg-yellow-400'
  }

  return (
    <div className="relative w-full h-4 bg-gray-200  overflow-hidden text-xs font-medium leading-4">
      <div
        className={`absolute top-0 right-0 bottom-0 ${fillColor}`}
        style={{ width: `${safeFill}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center mix-blend-difference text-white z-10">
        {safeFill}%
      </span>
    </div>
  )
}
