import {
  BookOpen,
  Droplet,
  Funnel,
  Heart,
  MessageCircleHeart,
  Minus,
  Mountain,
  Sunrise,
  TreeDeciduous,
  User,
  Users,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getQuotes,
  UserFavoriteQuotes,
  addFavouriteQuote,
  removeFavouriteQuote,
} from "../services/quoteService";
import Button from "../components/ui/Button";
import DropdownMenu from "../components/ui/DropdownMenu";
import SearchBar from "../components/ui/SearchBar";

type QuoteType = {
  _id: string;
  quoteText: string;
  author: string;
  isFavorite: boolean;
};
const sortOptions = [
  {
    value: "sort",
    label: "Category",
    icon: Funnel,
  },
  {
    value: "motivation",
    label: "Motivation",
    icon: Wind,
  },
  {
    value: "wisdom",
    label: "Wisdom",
    icon: TreeDeciduous,
  },
  {
    value: "mindfulness",
    label: "Mindfulness",
    icon: Droplet,
  },
  {
    value: "preseverance",
    label: "Preseverance",
    icon: Mountain,
  },
  {
    value: "calm",
    label: "Calm",
    icon: Minus,
  },
  {
    value: "positivity",
    label: "Positive",
    icon: MessageCircleHeart,
  },
  {
    value: "reflection",
    label: "Reflection",
    icon: Sunrise,
  },
  {
    value: "inspiration",
    label: "Inspiration",
    icon: Users,
  },
  {
    value: "self-awareness",
    label: "Self-awareness",
    icon: User,
  },
];
function QuotesPage() {
  const [activeTab, setActiveTab] = useState<"favorites" | "more">("favorites");
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [favoriteQuotes, setFavoriteQuotes] = useState<QuoteType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);
  const [search, setSearch] = useState("");
  const limit = 30;
  useEffect(() => {
    const fetchQuotes = async () => {
      setIsSubmitting(true);
      try {
        const allRes = await getQuotes({
          page,
          limit,
          category: sortBy,
          search,
        });
        const favRes = await UserFavoriteQuotes();
        const favoriteIds = new Set(
          favRes.favoriteQuotes.map((q: any) => q._id)
        );

        const allQuotes: QuoteType[] = allRes.quotes.map((q: any) => ({
          ...q,
          isFavorite: favoriteIds.has(q._id),
        }));
        const allFavQuotes: QuoteType[] = favRes.favoriteQuotes.map(
          (q: any) => ({
            ...q,
            isFavorite: true,
          })
        );
        setFavoriteQuotes(allFavQuotes);
        setQuotes(allQuotes);
      } catch (error) {
        console.error("Failed to fetch quotes", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    fetchQuotes();
  }, [page, sortBy, search]);

  const toggleFavorite = async (quoteId: string) => {
    const favQuote = favoriteQuotes.find((q) => q._id === quoteId);
    const quote = quotes.find((q) => q._id === quoteId);

    if (favQuote) {
      setFavoriteQuotes((prev) => prev.filter((q) => q._id !== quoteId));
      setQuotes((prev) =>
        prev.map((q) => (q._id === quoteId ? { ...q, isFavorite: true } : q))
      );
      await removeFavouriteQuote(quoteId);
    } else if (quote) {
      const newFav = { ...quote, isFavorite: true };
      setFavoriteQuotes((prev) => [...prev, newFav]);
      setQuotes((prev) =>
        prev.map((q) => (q._id === quoteId ? { ...q, isFavorite: true } : q))
      );
      await addFavouriteQuote(quoteId);
    }
  };

  const displayedQuotes = activeTab === "favorites" ? favoriteQuotes : quotes;

  return (
    <div className="space-y-4 p-4 sm:p-6 lg:p-8">
      <div className="sticky top-0 space-y-2 bg-brand-50 rounded-lg border-1 border-brand-100 shadow-md  p-4">
        {/* Header */}
        <div className="flex items-center gap-1 md:gap-2">
          <BookOpen className="h-5 w-5 md:h-8 md:w-8"/>
          <h1 className="text-lg md:text-4xl font-extrabold text-brand-950">
            Quotes
          </h1>
        </div>
        {/* mobile view */}
        <div className=" space-y-2 md:hidden">
          <div className="flex gap-2">
            <button
              className={`px-2 py-1 font-semibold text-xs rounded-md transition-all ${
                activeTab === "favorites"
                  ? "bg-brand-500 text-white shadow-sm"
                  : "text-brand-600 hover:bg-brand-50 border-1 border-brand-100 shadow-sm"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Favorites
            </button>
            <button
              className={` px-2 py-1 font-semibold text-xs rounded-md transition-all ${
                activeTab === "more"
                  ? "bg-brand-500 text-white shadow-sm"
                  : "text-brand-500 hover:bg-brand-50 border-1 border-brand-100 shadow-sm"
              }`}
              onClick={() => setActiveTab("more")}
            >
              More Quotes
            </button>
          </div>
          <div className="space-y-2">
            <SearchBar value={search} onChange={setSearch} />
            <DropdownMenu
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>
        {/* desktop view */}
        <div className="hidden md:flex justify-between items-start text-base lg:text-lg gap-2">
          <div className="flex gap-4 ">
            <button
              className={`px-4 py-2 font-semibold  ${
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
          <div className="flex flex-col md:flex-row justify-center gap-4 items-start">
            <SearchBar value={search} onChange={setSearch} />
            <DropdownMenu
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>
      </div>

      {/* Quotes List */}
      <div className="flex flex-col gap-2 ">
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
                <p className="italic text-brand-900 text-xs sm:text-sm md:text-lg ">"{quote.quoteText}"</p>
                <p className="text-[0.625rem] sm:text-xs md:text-sm ml-2 md:ml-4 font-bold text-brand-950">
                  - {quote.author}
                </p>
              </div>
              <button className="self-start md:self-center" onClick={() => toggleFavorite(quote._id)}>
                <Heart
                  className={`transition-colors w-4 h-4 md:w-6 md:h-6 ${
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
      {quotes.length > 0 && activeTab === "more" ? (
        <div className="flex justify-between items-center">
          <Button
            variant="secondary"
            className={`${page === 1 ? "invisible" : "visible"}`}
            onClick={() => setPage((prev) => prev - 1)}
            disabled={isSubmitting}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            variant="primary"
            disabled={isSubmitting}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default QuotesPage;
