import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center w-full bg-white border border-slate-200 rounded-full shadow-sm pl-4 pr-2 py-1.5 hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-300">
        <div className="w-8 shrink-0"></div>

        <div className="flex-1 flex flex-col items-center overflow-hidden">
          <label
            htmlFor="main-search"
            className="text-[12px] font-bold text-slate-900 tracking-wider leading-none mb-0.5 cursor-pointer"
          >
            Find your place
          </label>

          <Input
            id="main-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dorms, condos, or locations..."
            className="h-5 w-full bg-transparent border-0 shadow-none text-center text-sm text-slate-600 placeholder:text-slate-400 focus-visible:ring-0 p-0 leading-tight truncate"
          />
        </div>

        <Button
          type="submit"
          className="bg-orange-600 p-2.5 rounded-full text-white shrink-0 ml-2 hover:bg-orange-700 active:scale-95 transition-all shadow-sm"
        >
          <Search className="w-4 h-4" strokeWidth={3} />
        </Button>
      </div>
    </header>
  );
}
