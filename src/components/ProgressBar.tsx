export default function ProgressBar({ fillPercent }: { fillPercent: number }) {
  const safeFill = Math.min(Math.max(fillPercent, 0), 100)

  let fillColor = 'bg-green-500'
  if (safeFill > 80) {
    fillColor = 'bg-red-500'
  } else if (safeFill > 60) {
    fillColor = 'bg-yellow-400'
  }

  return (
    <div className="w-full h-6 border border-gray-300 rounded bg-white overflow-hidden relative text-sm flex flex-row-reverse">
      <div
        className={`h-full ${fillColor}`}
        style={{ width: `${safeFill}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-black font-medium">
        {safeFill}%
      </div>
    </div>
  )
}
