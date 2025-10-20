import React, { useState } from "react";

const NotificationSettings = () => {
  const [toggles, setToggles] = useState({
    desktop: true,
    unreadBadge: true,
    chats: false,
    leaveEmail: false,
    performanceEmail: true,
    reminders: false,
    communicationEmail: true,
    announcements: false,
    disableSounds: false,
  });

  const handleToggle = (key) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  return (
    <div className="max-w-[1600px] dark:bg-neutral-800 dark:text-white w-full mx-auto bg-white rounded-lg shadow border border-gray-200 p-6 space-y-6">
      {/* Notification Toggles */}
      <div className="space-y-5">
        {[
          {
            key: "desktop",
            title: "Enable Desktop Notification",
            desc: "Receive notification of all messages, contract, reminders, contract agreements",
          },
          {
            key: "unreadBadge",
            title: "Enable Unread Notification Badge",
            desc: "Receive notification of all messages, contract, reminders, contract agreements",
          },
          {
            key: "chats",
            title: "Enable chats Notification",
            desc: "Receive notification of all messages, contract, reminders, contract agreements",
          },
          {
            key: "leaveEmail",
            title: "Enable Email Notification For Leave Request",
            desc: "Receive notification of all messages, contract, reminders, contract agreements",
          },
          {
            key: "performanceEmail",
            title: "Enable Email Notification For Performance Review",
            desc: "Receive notification of all messages, contract, reminders, contract agreements",
          },
          {
            key: "reminders",
            title: "Set Reminders for Important Events and Deadlines",
            desc: "Receive notification of all messages, contract, reminders, contract agreements",
          },
        ].map(({ key, title, desc }) => (
          <div
            key={key}
            className="flex justify-between dark:text-white items-start border-b border-gray-100 pb-3 last:border-none"
          >
            <div>
              <h3 className="text-gray-800 font-medium dark:text-white text-sm">{title}</h3>
              <p className="text-gray-500 text-xs mt-1 dark:text-white">{desc}</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle(key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                toggles[key] ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  toggles[key] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Email Notification Section */}
      <div className="pt-4 border-t border-gray-200 space-y-5">
        <h3 className="text-gray-800 font-semibold text-sm dark:text-white">Email Notification</h3>
        {[
          {
            key: "communicationEmail",
            title: "Communication Email",
            desc: "Receive notification of all messages, contract, reminders, contract agreements",
          },
          {
            key: "announcements",
            title: "Announcements and Updates",
            desc: "Receive notification of all messages, contract, reminders, contract agreements",
          },
        ].map(({ key, title, desc }) => (
          <div
            key={key}
            className="flex justify-between dark:text-white items-start border-b border-gray-100 pb-3 last:border-none"
          >
            <div>
              <h3 className="text-gray-800 font-medium dark:text-white text-sm">{title}</h3>
              <p className="text-gray-500 text-xs dark:text-white mt-1">{desc}</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle(key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                toggles[key] ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  toggles[key] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Sounds Section */}
      <div className="pt-4 border-t border-gray-200 space-y-5">
        <h3 className="text-gray-800 font-semibold text-sm dark:text-white">Sounds</h3>
        <div className="flex justify-between dark:text-white items-start">
          <div>
            <h3 className="text-gray-800 dark:text-white font-medium text-sm">
              Disable All Notification Sounds
            </h3>
            <p className="text-gray-500 dark:text-white text-xs mt-1">
              Receive notification of all messages, contract, reminders, contract agreements
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleToggle("disableSounds")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              toggles.disableSounds ? "bg-emerald-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                toggles.disableSounds ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-emerald-600 text-white rounded-lg p-5 mt-6 space-y-3">
        <h4 className="font-semibold text-sm">
          We’ve just released a new update
        </h4>
        <p className="text-xs text-emerald-50">
          Check out the new dashboard view, Pages even now loads faster
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <label className="text-xs text-white">
            Subscribe to updates
          </label>
          <div className="flex w-full sm:w-auto gap-2">
            <input
              type="email"
              defaultValue="Oluma@gmail.com"
              className="px-3 py-2 rounded-md text-gray-800 text-sm focus:ring-2 focus:ring-white outline-none w-full sm:w-64"
            />
            <button className="bg-white text-emerald-600 font-medium text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
