import { useState, useMemo } from "react";

export default function PnlView({ trades }) {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0], // 1st of current month
    end: new Date().toISOString().split("T")[0],
  });

  const pnlData = useMemo(() => {
    // 1. Filter trades by date
    const filteredTrades = trades.filter((t) => {
      const tradeDate = t.created_at.split("T")[0];
      return tradeDate >= dateRange.start && tradeDate <= dateRange.end;
    });

    // 2. Simple calculation for this period
    // Logic: Sum of (Sell Value - Buy Value) for closed quantities
    let periodRealizedPnl = 0;
    const tempHoldings = {};

    // We sort trades chronologically to calculate realized P&L correctly
    const sortedTrades = [...trades].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at),
    );

    sortedTrades.forEach((trade) => {
      if (!tempHoldings[trade.symbol]) {
        tempHoldings[trade.symbol] = { qty: 0, avgPrice: 0 };
      }
      const h = tempHoldings[trade.symbol];
      const tradeDate = trade.created_at.split("T")[0];

      if (trade.type === "BUY") {
        const totalCost = h.qty * h.avgPrice + trade.quantity * trade.price;
        h.qty += trade.quantity;
        h.avgPrice = totalCost / h.qty;
      } else {
        // If this SELL falls within our selected date range, add to Period P&L
        if (tradeDate >= dateRange.start && tradeDate <= dateRange.end) {
          periodRealizedPnl += (trade.price - h.avgPrice) * trade.quantity;
        }
        h.qty -= trade.quantity;
      }
    });

    return { periodRealizedPnl };
  }, [trades, dateRange]);

  return (
    <div className="space-y-6">
      {/* Date Filter Bar */}
      <div className="flex gap-4 items-end bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">
            From
          </label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
            className="border border-slate-200 rounded p-2 text-sm focus:outline-orange-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">
            To
          </label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
            className="border border-slate-200 rounded p-2 text-sm focus:outline-orange-500"
          />
        </div>
      </div>

      {/* Period P&L Card */}
      <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm text-center">
        <p className="text-sm text-slate-500 mb-1">
          Realized P&L for this period
        </p>
        <p
          className={`text-4xl font-bold ${pnlData.periodRealizedPnl >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          {pnlData.periodRealizedPnl >= 0 ? "+" : ""}
          {pnlData.periodRealizedPnl.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
