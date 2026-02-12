export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8 border-b pb-4 border-slate-200">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
        Kite <span className="text-slate-400 font-light italic">for IBKR</span>
      </h1>
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        <span className="text-xs text-slate-500 font-medium uppercase">
          Cloud Synced
        </span>
      </div>
    </header>
  );
}
