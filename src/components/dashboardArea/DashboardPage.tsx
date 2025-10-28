import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { DashboardContentModel } from "../../models/DashboardContentModel";
import type { AppState } from "../../Redux/store";
import { dashboardService } from "../../Services/DashboardService";
import AiInsightCard from "./AiInsightCard";
import MemeCard from "./MemeCard";
import NewsCard from "./NewsCard";
import PriceCard from "./PriceCard";
import { Loader2 } from "lucide-react";


export default function DashboardPage() {
  const user = useSelector((state: AppState) => state.user);
  const [dashboardData, setDashboardData] = useState<Record<string, DashboardContentModel>>({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);

    dashboardService.getDashboard(user.id).then((data) => {
      setDashboardData(data);
      setLoading(false);
    });
  }, [user]);

  function renderCard(item: DashboardContentModel) {
    switch (item.contentType) {
      case "NEWS":
        return <NewsCard id={item.id} content={item.content} />;
      case "PRICES":
        return <PriceCard id={item.id} content={item.content} />;
      case "AI_INSIGHT":
        return <AiInsightCard id={item.id} content={item.content} />;
      case "MEME":
        return <MemeCard id={item.id} content={item.content} />;
      default:
        return null;
    }
  }

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-sky-600" />
        <p className="text-lg font-medium">
          Loading your personalized dashboard...
        </p>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-2">
      <h2 className="text-3xl font-bold text-center mb-4 text-sky-700">
        Your Dashboard
        </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {Object.values(dashboardData).map((item) => (
          <div key={item.id} className="transition hover:scale-[1.01]">
          {renderCard(item)}
      </div>
      ))}
      </div>
    </div>
  );
}