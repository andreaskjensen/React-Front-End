import { createFileRoute } from '@tanstack/react-router'
import ProgressBar from '../components/ProgressBar'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const rows = [
    { name: 'Stroke - 6Ø', value: 45, value2: 22, value3: 50 },
    { name: 'Lunge med', value: 65, value2: 33, value3: 20 },
    { name: 'Urologisk', value: 81, value2: 44, value3: 30 },
    { name: 'Onkologisk og Hæmatologisk', value: 22, value2: 90, value3: 70 },
  ]
  return (
    <div className="text-center">
      <header></header>
      <h1 className="text-4xl font-bold mt-8">Hospital Capacity Dashboard</h1>


<h2 className='text-2xl font-bold mt-16'>Basic HTML Table</h2>
      <table className="table border-collapse m-auto mt-4">
        <thead>
          <tr>
            <th className="text-left p-2">Afdeling</th>
            <th className="text-left p-2">Antal senge</th>
            <th className="text-left p-2">Kapacitet</th>
            <th className="text-left p-2">Forventet kapacitet</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="p-2">{row.name}</td>
              <td className="p-2">{row.value}</td>
              <td className="p-2 w-48">
                <ProgressBar fillPercent={row.value2} />
              </td>
              <td className="p-2 w-48">
                <ProgressBar fillPercent={row.value3} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

<h2 className='text-2xl font-bold mt-16'>Chadcn Table</h2>

      <Table className="w-1/3 m-auto mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Afdeling</TableHead>
            <TableHead className="text-right">Antal senge</TableHead>
            <TableHead className="text-right">Kapacitet</TableHead>
            <TableHead className="text-right">Forventet kapacitet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell className="text-left">{row.name}</TableCell>
              <TableCell className="text-right">{row.value}</TableCell>
              <TableCell className="text-right w-48">
                <ProgressBar fillPercent={row.value2} />
              </TableCell>
              <TableCell className="text-right w-48">
                {' '}
                <ProgressBar fillPercent={row.value3} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
