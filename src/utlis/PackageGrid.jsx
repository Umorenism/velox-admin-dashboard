
import React, { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import pic1 from "../assets/package1.svg";
import pic2 from "../assets/package2.svg";

const PackageGrid = ({ refreshKey }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackImages = [pic1, pic2];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/api/admin/packages");

        const fetchedPackages = response.data.map((pkg, index) => ({
          id: pkg._id,
          name: pkg.name,
          price: pkg.price,
          description: pkg.description,
          isFree: pkg.isFree,
          image: pkg.image || fallbackImages[index % fallbackImages.length],
        }));
        console.log("Fetched packages:", fetchedPackages);

        setPackages(fetchedPackages);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
        setError("Failed to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [refreshKey]);

  return (
    <div className="min-h-screen dark:bg-neutral-950 p-6 flex flex-col items-center">
      {loading && (
        <p className="text-gray-500 dark:text-gray-300 animate-pulse">
          Loading packages...
        </p>
      )}

      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 
                         rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="flex justify-center items-center p-4 bg-white dark:bg-neutral-900">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-28 h-28 object-contain"
                />
              </div>

              <div className="border-t border-gray-200 dark:border-neutral-800 p-3 text-center">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {pkg.name}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {pkg.description}
                </p>

                <p className="mt-2 text-sm font-medium">
                  {pkg.isFree ? (
                    <span className="text-green-500">Free</span>
                  ) : (
                    <span className="text-blue-500">${pkg.price}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageGrid;



