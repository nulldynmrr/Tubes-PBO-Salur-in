import React from "react";

export default function StatCard({ title, value, Icon, color = "blue" }) {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      iconBg: "bg-green-100",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      iconBg: "bg-red-100",
    },
  };

  const style = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 transition-transform hover:scale-[1.02] ${style.bg} shadow-sm`} // shadow-sm for smoother shadow
    >
      <div className="absolute right-4 bottom-4 opacity-10 text-7xl">
        <Icon className={style.text} size={72} />
      </div>

      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl ${style.iconBg} mb-4`}
      >
        <Icon className={style.text} size={24} />
      </div>

      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
