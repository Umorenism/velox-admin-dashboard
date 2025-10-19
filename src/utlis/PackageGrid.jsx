import React from "react";

const packages = [
  { id: 1, img: "/badges/starter.png", title: "Starter Package" },
  { id: 2, img: "/badges/500.png", title: "Starter Package" },
  { id: 3, img: "/badges/1k.png", title: "Starter Package" },
  { id: 4, img: "/badges/300.png", title: "Starter Package" },
  { id: 5, img: "/badges/3k.png", title: "Starter Package" },
  { id: 6, img: "/badges/2k.png", title: "Starter Package" },
  { id: 7, img: "/badges/10k.png", title: "Starter Package" },
  { id: 8, img: "/badges/5k.png", title: "Starter Package" },
  { id: 9, img: "/badges/20k.png", title: "Starter Package" },
  { id: 10, img: "/badges/15k.png", title: "Starter Package" },
  { id: 11, img: "/badges/40k.png", title: "Starter Package" },
  { id: 12, img: "/badges/50k.png", title: "Starter Package" },
  { id: 13, img: "/badges/30k.png", title: "Starter Package" },
  { id: 14, img: "/badges/100k.png", title: "Starter Package" },
  { id: 15, img: "/badges/70k.png", title: "Starter Package" },
];

const PackageGrid = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-6 flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
        Available Packages
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 
                       rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="flex justify-center items-center p-4 bg-white dark:bg-neutral-900">
              <img
                src={pkg.img}
                alt={pkg.title}
                className="w-28 h-28 object-contain"
              />
            </div>
            <div className="border-t border-gray-200 dark:border-neutral-800 p-2 text-center">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {pkg.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageGrid;
