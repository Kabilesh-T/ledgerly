import { useMemo } from "react";

export default function HoldingsView({ trades }) {
  const { holdings, totalInvested, totalRealizedPnl } = useMemo(() => {
    const aggregated = trades.reduce((acc, trade) => {
      if (!acc[trade.symbol]) {
        acc[trade.symbol] = {
          symbol: trade.symbol,
          quantity: 0,
          totalCost: 0,
          avgPrice: 0,
          realizedPnl: 0,
        };
      }

      const h = acc[trade.symbol];
      const tradeValue = trade.quantity * trade.price;

      if (trade.type === "BUY") {
        h.quantity += trade.quantity;
        h.totalCost += tradeValue;
        h.avgPrice = h.totalCost / h.quantity;
      } else {
        // Realized P&L logic: (Sell Price - Avg Buy Price) * Qty Sold
        const pnlFromSale = (trade.price - h.avgPrice) * trade.quantity;
        h.realizedPnl += pnlFromSale;

        h.quantity -= trade.quantity;
        h.totalCost -= trade.quantity * h.avgPrice;
      }
      return acc;
    }, {});

    const holdingsArray = Object.values(aggregated);
    const totalInvested = holdingsArray.reduce(
      (sum, h) => sum + (h.quantity > 0 ? h.totalCost : 0),
      0,
    );
    const totalRealizedPnl = holdingsArray.reduce(
      (sum, h) => sum + h.realizedPnl,
      0,
    );

    return { holdings: holdingsArray, totalInvested, totalRealizedPnl };
  }, [trades]);

  return (
    <div>
      {/* Summary Ribbon inside the view */}
      <div className="flex gap-12 mb-8 bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
        <div>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-1">
            Total Invested
          </p>
          <p className="text-2xl font-semibold text-slate-800">
            {totalInvested.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-1">
            Realized P&L
          </p>
          <p
            className={`text-2xl font-semibold ${totalRealizedPnl >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {totalRealizedPnl >= 0 ? "+" : ""}
            {totalRealizedPnl.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="p-4">Instrument</th>
              <th className="p-4 text-right">Qty.</th>
              <th className="p-4 text-right">Avg. Price</th>
              <th className="p-4 text-right">Net Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {holdings
              .filter((h) => h.quantity !== 0)
              .map((h) => (
                <tr key={h.symbol} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-medium text-slate-700">{h.symbol}</td>
                  <td className="p-4 text-right font-mono">{h.quantity}</td>
                  <td className="p-4 text-right">{h.avgPrice.toFixed(2)}</td>
                  <td className="p-4 text-right font-medium">
                    {(h.quantity * h.avgPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
