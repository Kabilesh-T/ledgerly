export default function TradebookView({ trades, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider">
          <tr>
            <th className="p-4">Instrument</th>
            <th className="p-4 text-right">Qty.</th>
            <th className="p-4 text-right">Price</th>
            <th className="p-4 text-right">Type</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {trades.map((trade) => (
            <tr key={trade.id} className="hover:bg-slate-50 transition">
              <td className="p-4 font-medium">{trade.symbol}</td>
              <td className="p-4 text-right font-mono">{trade.quantity}</td>
              <td className="p-4 text-right">{trade.price.toFixed(2)}</td>
              <td className="p-4 text-right">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${trade.type === "BUY" ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"}`}
                >
                  {trade.type}
                </span>
              </td>
              <td className="p-4 text-right">
                {/* Delete logic here if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
