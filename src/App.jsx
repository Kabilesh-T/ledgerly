import { useEffect, useState } from "react";
import { supabase } from "./config/supabaseClient";
import Header from "./components/Header";
import TradeForm from "./components/TradeForm";
import HoldingsView from "./views/HoldingsView";
import TradebookView from "./views/TradebookView";
import Tabs from "./components/Tabs";
import { TABS } from "./constants/constants";

function App() {
  const [trades, setTrades] = useState([]);
  const [activeTab, setActiveTab] = useState(TABS.HOLDINGS);

  useEffect(() => {
    fetchTrades();
  }, []);

  async function fetchTrades() {
    const { data } = await supabase
      .from("trades")
      .select("*")
      .order("created_at", { ascending: false });
    setTrades(data || []);
  }

  async function onAdd(formData) {
    const { error } = await supabase.from("trades").insert([
      {
        symbol: formData.symbol.toUpperCase(),
        type: formData.type,
        quantity: parseFloat(formData.quantity),
        price: parseFloat(formData.price),
      },
    ]);
    if (!error) {
      fetchTrades();
    }
  }

  async function deleteTrade(id) {
    const { error } = await supabase.from("trades").delete().eq("id", id);
    if (!error) fetchTrades();
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        <Header />

        {/* Input Form */}
        <TradeForm onAdd={onAdd} />

        {/* Tabs Navigation */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === TABS.HOLDINGS ? (
          <HoldingsView trades={trades} />
        ) : (
          <TradebookView trades={trades} />
        )}
      </div>
    </div>
  );
}

export default App;
