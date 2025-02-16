import { useState, useEffect } from "react";

export default function CategoryFilter({ filters, setFilters }) {
  const [colorOptions, setColorOptions] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  // Fetch color options from the backend
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products"); // Your API endpoint
        const data = await response.json();
        setColorOptions(data.colors || []); // Ensure 'colors' is an array, fallback to empty array if undefined
        setLoading(false);
      } catch (error) {
        console.error("Error fetching colors:", error);
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  // Handle input changes (for category, color, price)
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter the color options based on the input (substring match)
  const filteredColors = colorOptions.filter(
    (color) => color.toLowerCase().includes(filters.color.toLowerCase()) // Case insensitive match
  );

  return (
    <div className="w-full p-3  bg-gray-50 rounded-lg">
      <h2 className="text-sm font-semibold mb-2">Filters</h2>

      {/* Filter Fields in a Row */}
      <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
        {/* Category Filter */}
        <div className="flex-1 min-w-[140px] space-y-1">
          <label className="block text-xs font-medium">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full p-1 border rounded text-xs"
          >
            <option value="all">All</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Color Filter */}
        <div className="flex-1 min-w-[120px] space-y-1">
          <label className="block text-xs font-medium">Color</label>
          <input
            type="text"
            name="color"
            value={filters.color}
            onChange={handleChange}
            placeholder="Enter color"
            className="w-full p-1 border rounded text-xs"
          />
          {/* Display filtered color options */}
          <div className="mt-2">
            {loading ? (
              <div className="text-xs text-gray-400">Loading colors...</div>
            ) : filteredColors.length > 0 ? (
              filteredColors.map((color, index) => (
                <div key={index} className="text-xs text-gray-700">
                  {color}
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-400"> </div>
            )}
          </div>
        </div>

        {/* Price Filter */}
        <div className="flex-1 min-w-[180px] space-y-1">
          <label className="block text-xs font-medium">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min"
              className="w-1/2 p-1 border rounded text-xs"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max"
              className="w-1/2 p-1 border rounded text-xs"
            />
          </div>
        </div>
      </div>

      {/* Reset Button Below Filters */}
      <div className="mt-4 ">
        <button
          onClick={() =>
            setFilters({
              category: "all",
              color: "",
              minPrice: "",
              maxPrice: "",
            })
          }
          className="w-full text-gray-700 py-1 rounded text-xs hover:bg-gray-300"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
