import React from "react"
interface TableContentInterface {
  name: string,
  feedback: string,
  date: Date
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Feedback
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {TableContent.map((content: TableContentInterface, i) => (
              <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {content.name}
                </th>
                <td className="px-6 py-4">
                  {content.feedback}
                </td>
                <td className="px-6 py-4">
                  {getPrettyDate(content.date)}
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
