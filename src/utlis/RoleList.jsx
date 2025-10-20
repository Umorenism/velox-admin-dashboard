import React from "react";

const RolesList = () => {
  const defaultRoles = [
    { name: "Role 1", isDefault: true },
    { name: "Role 2" },
    { name: "Role 3" },
    { name: "Role 4" },
    { name: "Role 5" },
    { name: "Role 6" },
  ];

  const customRoles = [{ name: "Role 7" }];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-6">
      {/* Default Roles */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-3">
          <h2 className="text-gray-800 font-semibold text-sm">Default Roles</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {defaultRoles.map((role, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
            >
              <span className="text-gray-700 text-sm">{role.name}</span>
              {role.isDefault && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                  Default Role
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Roles */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-3">
          <h2 className="text-gray-800 font-semibold text-sm">Custom Roles</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {customRoles.map((role, idx) => (
            <div
              key={idx}
              className="px-4 py-3 text-gray-700 text-sm hover:bg-gray-50 cursor-pointer transition"
            >
              {role.name}
            </div>
          ))}
        </div>
      </div>

      {/* Create Custom Role Button */}
      <div className="flex justify-center">
        <button className="text-emerald-600 border border-emerald-600 hover:bg-emerald-600 hover:text-white transition font-medium text-sm px-6 py-2 rounded-md">
          Create Custom Role
        </button>
      </div>
    </div>
  );
};

export default RolesList;
