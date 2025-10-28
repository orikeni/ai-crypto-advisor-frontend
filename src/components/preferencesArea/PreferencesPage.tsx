import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ContentType } from "../../models/ContentType";
import { InvestorType } from "../../models/InvestorType ";
import type { UserPreferencesModel } from "../../models/UserPreferencesModel";
import type { AppState } from "../../Redux/store";
import { preferencesService } from "../../Services/PreferencesService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function PreferencesPage() {
    const user = useSelector((state: AppState) => state.user); 
    const [interestedAssets, setInterestedAssets] = useState<string[]>([]);
    const [investorType, setInvestorType] = useState<InvestorType | null>(null);
    const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
    const navigate = useNavigate();
  
    const availableAssets = [
        { label: "Bitcoin", value: "BTC" },
        { label: "Ethereum", value: "ETH" },
        { label: "Solana", value: "SOL" },
        { label: "Dogecoin", value: "DOGE" },
        { label: "Cardano", value: "ADA" }
      ];
      
    const investorLabels: Record<InvestorType, string> = {
        HODLER: "Hodler (Long-term holder)",
        DAY_TRADER: "Day Trader",
        NFT_COLLECTOR: "NFT Collector",
        LONG_TERM: "Long-Term Investor",
        SWING_TRADER: "Swing Trader",
      };
      
      const contentOptions = [
      { key: ContentType.NEWS, label: "Market News" },
      { key: ContentType.PRICES, label: "Coin Prices" },
      { key: ContentType.AI_INSIGHT, label: "AI Insight of the Day" },
      { key: ContentType.MEME, label: "Fun Crypto Meme" }
    ];
  
    useEffect(() => {
      if (user?.id) {
        preferencesService.getPreferences(user.id).then((prefs) => {
          if (prefs) {
            setInterestedAssets(prefs.interestedAssets || []);
            setInvestorType(prefs.investorType || null);
            setContentTypes(prefs.contentTypes || []);
          }
        });
      }
    }, [user]);
  
    function handleAssetChange(asset: string) {
        setInterestedAssets((prev) =>
          prev.includes(asset) ? prev.filter((a) => a !== asset) : [...prev, asset]
        );
      }
  
    function handleContentChange(type: ContentType) {
      setContentTypes((prev) =>
        prev.includes(type) ? prev.filter((c) => c !== type) : [...prev, type]
      );
    }
  
    async function handleSubmit() {
      if (!user?.id) {
        toast.error("User not logged in ");
        return;
      }
  
      const prefs: UserPreferencesModel = {
        interestedAssets,
        investorType: investorType!,
        contentTypes
      };
  
      await preferencesService.savePreferences(user.id, prefs);
      toast.success("Preferences saved successfully", {
        duration: 3000,
      });
      navigate("/dashboard");
    }
  
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
    <div className="bg-white border-2 border-gray-400 rounded-2xl shadow-md p-8 space-y-5">
      <h2 className="text-3xl font-bold text-center text-sky-700">
        Preferences Questionnaire
      </h2>

      <p className="text-center text-gray-600">
        Please select your preferences so we can personalize your experience
      </p>

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="font-semibold text-gray-700 text-lg">Assets</div>
        <div className="col-span-2">
          <p className="mb-2 text-gray-500 text-sm">
            What crypto assets are you interested in?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {availableAssets.map((asset) => (
              <label
                key={asset.value}
                className="flex items-center space-x-2 text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={interestedAssets.includes(asset.value)}
                  onChange={() => handleAssetChange(asset.value)}
                  className="accent-sky-500"
                />
                <span>{asset.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="font-semibold text-gray-700 text-lg">Investor Type</div>
        <div className="col-span-2">
          <p className="mb-2 text-gray-500 text-sm">
            What type of investor are you?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(investorLabels).map(([type, label]) => (
              <label
                key={type}
                className="flex items-center space-x-2 text-gray-700 text-sm"
              >
                <input
                  type="radio"
                  name="investorType"
                  value={type}
                  checked={investorType === type}
                  onChange={() => setInvestorType(type as InvestorType)}
                  className="accent-sky-500"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="font-semibold text-gray-700 text-lg">Content Types</div>
        <div className="col-span-2">
          <p className="mb-2 text-gray-500 text-sm">
            What kind of content would you like to see?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {contentOptions.map((option) => (
              <label
                key={option.key}
                className="flex items-center space-x-2 text-gray-700 text-sm"
              >
                <input
                  type="checkbox"
                  checked={contentTypes.includes(option.key)}
                  onChange={() => handleContentChange(option.key)}
                  className="accent-sky-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={handleSubmit}
          className="px-10 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition"
        >
          Save Preferences
        </button>
      </div>
    </div>
  </div>
);
  }