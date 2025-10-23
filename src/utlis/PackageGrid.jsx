import React from "react";
import pic1 from '../assets/package1.svg'
import pic2 from '../assets/package2.svg'
const packages = [
  { id: 1, img: pic1, title: "Starter Package" },
  { id: 2, img: pic2, title: "Starter Package" },
  { id: 3, img: pic2, title: "Starter Package" },
  { id: 4, img: pic2, title: "Starter Package" },
  { id: 5, img: pic2, title: "Starter Package" },
  { id: 6, img: pic2, title: "Starter Package" },
  { id: 7, img: pic2, title: "Starter Package" },
  { id: 8, img: pic2, title: "Starter Package" },
  { id: 9, img: pic2, title: "Starter Package" },
  { id: 10, img: pic2, title: "Starter Package" },
  { id: 11, img: pic2, title: "Starter Package" },
  { id: 12, img: pic2, title: "Starter Package" },
  { id: 13, img: pic2, title: "Starter Package" },
  { id: 14, img: pic2, title: "Starter Package" },
  { id: 15, img: pic2, title: "Starter Package" },
];

const PackageGrid = () => {
  return (
    <div className="min-h-screen  dark:bg-neutral-950 p-6 flex flex-col items-center">
      

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full ">
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






