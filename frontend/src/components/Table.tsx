import React from "react"
interface TableContentInterface {
  name: string,
  feedback: string,
  time: Date
}

interface TableProps {
  TableContent: TableContentInterface[];
}

const Table: React.FC<TableProps> = ({ TableContent }) => {
  const getPrettyDate=(date: Date) => {
    const dt = new Date(date)
    return `${dt.getHours()}:${dt.getMinutes()} - ${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`
  }
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase border-black border-2 bg-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Feedback
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {TableContent.map((content: TableContentInterface, i) => (
              <tr key={i} className="bg-white border-b border-2 broder-gray-200 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                  {content.name}
                </th>
                <td className="px-6 py-4 text-center">
                  {content.feedback}
                </td>
                <td className="px-6 py-4 text-center text-wrap break-words h-auto">
                  {getPrettyDate(content.time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Table
