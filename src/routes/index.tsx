import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useFlights } from "../hooks/useFlights";
import SearchForm from "../components/SearchForm";
import Filters from "../components/Filters";
import FlightList from "../components/filters/FlightList";
import PriceGraph from "../components/PriceGraph";
import type { FlightOffer } from "../types/flight";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [params, setParams] = useState<{
    origin: string;
    destination: string;
    date: string;
  } | null>(null);

  const [filters, setFilters] = useState({
    maxPrice: 2000,
    stops: "any" as "any" | "0" | "1" | "2+",
    airlines: [] as string[],
  });

  const { data, isLoading } = useFlights(params);

  const flights = data?.data ?? [];

  const filteredFlights = useMemo(() => {
    return flights.filter((f: FlightOffer) => {
      const price = Number(f.price.total);
      const stops = f.itineraries[0].segments.length - 1;
      const airline =
        f.itineraries[0].segments[0].carrierCode;

      if (price > filters.maxPrice) return false;

      if (filters.stops !== "any") {
        if (filters.stops === "0" && stops !== 0) return false;
        if (filters.stops === "1" && stops !== 1) return false;
        if (filters.stops === "2+" && stops < 2) return false;
      }

      if (
        filters.airlines.length &&
        !filters.airlines.includes(airline)
      )
        return false;

      return true;
    });
  }, [flights, filters]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <SearchForm onSearch={setParams} />

      {isLoading && <p>Loading flights...</p>}

      {!!flights.length && (
        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <Filters flights={flights} onChange={setFilters} />
          <div className="space-y-4">
            <PriceGraph flights={filteredFlights} />
            <FlightList flights={filteredFlights} />
          </div>
        </div>
      )}
    </div>
  );
}
