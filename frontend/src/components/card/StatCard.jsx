import React from "react";

export default function StatCard({ title, value, Icon, color = "blue" }) {
  const colorMap = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
      text: "text-blue-600",
      iconBg: "bg-blue-500",
      shadow: "shadow-sm",
    },
    green: {
      bg: "bg-gradient-to-br from-green-50 to-green-100",
      text: "text-green-600",
      iconBg: "bg-green-500",
      shadow: "shadow-sm",
    },
    red: {
      bg: "bg-gradient-to-br from-red-50 to-red-100",
      text: "text-red-600",
      iconBg: "bg-red-500",
      shadow: "shadow-sm",
    },
  };

  const style = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] ${style.bg} ${style.shadow}`}
    >
      <div className="absolute -right-4 -bottom-4 opacity-10">
        <Icon className={style.text} size={96} />
      </div>

      <div className="relative z-10">
        <div
          className={`w-14 h-14 flex items-center justify-center rounded-xl ${style.iconBg} mb-4 shadow-sm`}
        >
          <Icon className="text-white" size={28} />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
