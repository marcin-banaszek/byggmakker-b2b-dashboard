import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  ChevronDown, 
  MoreHorizontal, 
  ExternalLink,
  Filter,
  Download
} from "lucide-react"

interface DataTableProps {
  title: string
  data: Array<Record<string, unknown>>
  columns: {
    header: string
    accessor: string
    cell?: (item: Record<string, unknown>) => React.ReactNode
  }[]
}

export function DashboardTable({ title, data, columns }: DataTableProps) {
  return (
    <div className="bg-white rounded-sm border border-[#e5e5e5] shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-[#eeeeee] flex justify-between items-center bg-[#fafafa]">
        <h3 className="font-bold text-[#333333] uppercase text-xs tracking-wider">{title}</h3>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-[#efefef] rounded-sm text-[#888888]">
            <Filter className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-[#efefef] rounded-sm text-[#888888]">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#eeeeee]">
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3 text-xs font-black uppercase text-text-neutral-light tracking-widest bg-white">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-3 bg-white w-10"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-b border-[#f5f5f5] hover:bg-[#fafafa] transition-colors group">
                {columns.map((col, j) => (
                  <td key={j} className="px-6 py-4 text-xs font-medium text-[#333333]">
                    {col.cell ? col.cell(item) : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-[#efefef] rounded text-[#888888] transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
