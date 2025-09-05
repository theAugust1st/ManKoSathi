import { BookOpen, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getQuotes,
  UserFavoriteQuotes,
  addFavouriteQuote,
  removeFavouriteQuote,
} from "../services/quoteService";

type QuoteType = {
  _id: string;
  quoteText: string;
  author: string;
  isFavorite: boolean;
};

function QuotesPage() {
  const [activeTab, setActiveTab] = useState<"favorites" | "more">("favorites");
  const [quotes, setQuotes] = useState<QuoteType[]>([]);

  // Fetch quotes and mark favorites
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const allRes = await getQuotes();
        const favRes = await UserFavoriteQuotes();

        const favoriteIds = new Set(favRes.favoriteQuotes.map((q: any) => q._id));

        const allQuotes: QuoteType[] = allRes.quotes.map((q: any) => ({
          ...q,
          isFavorite: favoriteIds.has(q._id),
        }));

        setQuotes(allQuotes);
      } catch (error) {
        console.error("Failed to fetch quotes", error);
      }
    };

    fetchQuotes();
  }, []);

  // Toggle favorite (optimistic UI)
  const toggleFavorite = async (quoteId: string) => {
    const quote = quotes.find((q) => q._id === quoteId);
    if (!quote) return;

    // Optimistic UI update
    setQuotes((prev) =>
      prev.map((q) =>
        q._id === quoteId ? { ...q, isFavorite: !q.isFavorite } : q
      )
    );

    try {
      if (quote.isFavorite) {
        await removeFavouriteQuote(quoteId);
      } else {
        await addFavouriteQuote(quoteId);
      }
    } catch (error) {
      console.error("Failed to update favorite", error);
      // revert UI if API fails
      setQuotes((prev) =>
        prev.map((q) =>
          q._id === quoteId ? { ...q, isFavorite: quote.isFavorite } : q
        )
      );
    }
  };

  // Filter quotes based on active tab
  const displayedQuotes =
    activeTab === "favorites" ? quotes.filter((q) => q.isFavorite) : quotes;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BookOpen size={32} />
        <h1 className="text-3xl md:text-4xl font-bold text-brand-950">
          Quotes
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-brand-200 pb-2">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "favorites"
              ? "border-b-2 border-brand-500 text-brand-950"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "more"
              ? "border-b-2 border-brand-500 text-brand-950"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("more")}
        >
          More Quotes
        </button>
      </div>

      {/* Quotes List */}
      <div className="flex flex-col gap-2">
        {displayedQuotes.length === 0 ? (
          <p className="text-gray-500">
            {activeTab === "favorites"
              ? "No favorite quotes yet."
              : "No quotes available."}
          </p>
        ) : (
          displayedQuotes.map((quote) => (
            <div
              key={quote._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div>
                <p className="italic text-brand-900">"{quote.quoteText}"</p>
                <p className="text-md ml-4 font-semibold text-brand-950">
                  - {quote.author}
                </p>
              </div>
              <button onClick={() => toggleFavorite(quote._id)}>
                <Heart
                  size={24}
                  className={`transition-colors ${
                    quote.isFavorite
                      ? "text-red-500 fill-current"
                      : "text-brand-600 hover:text-red-500"
                  }`}
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default QuotesPage;
