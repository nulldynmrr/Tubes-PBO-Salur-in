import StatusLabel from "@/components/ui/label";

export default function TableData({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            {columns.map((col, i) => (
              <th key={i} className="p-2 border">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {columns.map((col, j) => (
                <td key={j} className="p-2 border">
                  {col === "Status" ? (
                    <StatusLabel status={row[col]} />
                  ) : (
                    row[col]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
