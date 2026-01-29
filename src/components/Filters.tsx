export default function Filters({ flights, onChange }: any) {
  const airlines = Array.from(
    new Set(
      flights.map(
        (f: any) => f.itineraries[0].segments[0].carrierCode
      )
    )
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h3 className="font-semibold text-lg">Filters</h3>

      <div>
        <label>Max Price ($)</label>
        <input
          type="range"
          min={100}
          max={2000}
          defaultValue={2000}
          onChange={(e) =>
            onChange((prev: any) => ({
              ...prev,
              maxPrice: Number(e.target.value),
            }))
          }
        />
      </div>

      <div>
        <label>Stops</label>
        <select
          className="input"
          onChange={(e) =>
            onChange((prev: any) => ({
              ...prev,
              stops: e.target.value,
            }))
          }
        >
          <option value="any">Any</option>
          <option value="0">Non-stop</option>
          <option value="1">1 Stop</option>
          <option value="2+">2+ Stops</option>
        </select>
      </div>

      <div>
        <label>Airlines</label>
        <div className="space-y-1">
          {airlines.map((a) => (
            <label key={a} className="flex gap-2">
              <input
                type="checkbox"
                value={a}
                onChange={(e) =>
                  onChange((prev: any) => {
                    const set = new Set(prev.airlines);
                    e.target.checked ? set.add(a) : set.delete(a);
                    return { ...prev, airlines: [...set] };
                  })
                }
              />
              {a}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
