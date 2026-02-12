import { TABS } from "../constants/constants";
export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: TABS.HOLDINGS, label: "Holdings" },
    { id: TABS.TRADEBOOK, label: "Tradebook" },
    { id: TABS.PNL, label: TABS.PNL },
  ];
  return (
    <div className="flex gap-8 mb-6 border-b border-slate-200 text-sm font-medium">
      {tabs.map((tab) => (
        <button
          onClick={() => setActiveTab(tab.id)}
          className={`pb-3 transition-colors ${
            activeTab === tab.id
              ? "border-b-2 border-orange-500 text-orange-600"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
