import React from "react";



const transactions = [
  {
    id: 1,
    username: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    userType: "Admin",
    action: "Edit / Delete",
  },
  {
    id: 2,
    username: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    userType: "User",
    action: "Edit / Delete",
  },
  {
    id: 3,
    username: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1 (555) 222-3333",
    userType: "Leader",
    action: "Edit / Delete",
  },
  {
    id: 4,
    username: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 444-5555",
    userType: "User",
    action: "Edit / Delete",
  },
  {
    id: 5,
    username: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "+1 (555) 666-7777",
    userType: "Admin",
    action: "Edit / Delete",
  },
  {
    id: 6,
    username: "Sophia Wilson",
    email: "sophia.wilson@example.com",
    phone: "+1 (555) 888-9999",
    userType: "User",
    action: "Edit / Delete",
  },
];


const UserTable = () => {
  return (
    <div className="p-5 bg-white dark:bg-neutral-800 min-h-auto dark:text-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-3">
        <div className="flex dark:text-white items-center gap-2 text-sm text-gray-700">
          <span>Showing</span>
          <select
            className="border dark:text-white border-gray-300 rounded-md text-sm px-2 py-1"
            defaultValue="10"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>Entries</span>
        </div>
      </div>

      {/* <div className="overflow-x-auto">
        <table className="min-w-full mt-5 border border-gray-200 text-sm">
          <thead className="bg-gray-50 dark:bg-neutral-800  dark:text-white text-gray-700">
            <tr>
              {[
                "S/N",
                "Username",
                "Email Address",
                "Phone Number",
                "User Type",
                
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left font-medium border-b border-gray-200"
                >
                  <div className="flex items-center gap-1">
                    {heading}
                    <span className="text-gray-400 cursor-pointer">⇅</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors dark:text-white"
              >
                <td className="px-4 py-3">{tx.id}</td>
                <td className="px-4 py-3">{tx.type}</td>
                <td className="px-4 py-3">{tx.username}</td>
                <td className="px-4 py-3">{tx.package}</td>
                <td className="px-4 py-3">{tx.amount}</td>
                <td className="px-4 py-3">{tx.method}</td>
                <td className="px-4 py-3">
                  <span className="border-emerald-500 text-emerald-500 text-xs border  px-3 py-1 rounded-full">
                    {tx.status}
                  </span>
                  <span className="bg-emerald-500 text-white text-xs ml-2 px-3 py-1 rounded-full">
                    {tx.funds}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <div className="overflow-x-auto">
      <table className="min-w-full mt-5 border border-gray-200 text-sm">
        <thead className="bg-gray-50 dark:bg-neutral-800 dark:text-white text-gray-700">
          <tr>
            {[
              "S/N",
              "Username",
              "Email Address",
              "Phone Number",
              "User Type",
              "Action",
            ].map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left font-medium border-b border-gray-200"
              >
                <div className="flex items-center gap-1">
                  {heading}
                  <span className="text-gray-400 cursor-pointer">⇅</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-gray-700 dark:text-white">
          {transactions.map((user, index) => (
            <tr
              key={user.id}
              className="border-b hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{user.username}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.phone}</td>
              <td className="px-4 py-3">{user.userType}</td>
              <td className="px-4 py-3">
  <div className="flex items-center gap-3">
    {/* Activity Button */}
    <button className="border border-[#00A991] text-[#00A991] hover:bg-[#00A991] hover:text-white text-xs font-medium px-4 py-1.5 rounded-full transition duration-200">
      Activity
    </button>

    {/* Fund Package Button */}
    <button className="bg-[#00A991] text-white hover:bg-[#008f7b] text-xs font-medium px-4 py-1.5 rounded-full transition duration-200">
      Fund Package
    </button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-white">
        <div className="mt-5">
          Page <span className="font-semibold">1</span> of{" "}
          <span className="font-semibold">1</span>
        </div>

        <div className="flex mt-5 items-center gap-3">
          <button className="text-gray-400 hover:text-gray-700">Previous</button>
          <button className="bg-orange-500 text-white px-2 py-1 rounded-full">
            1
          </button>
          <button className="text-gray-400 hover:text-gray-700">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
