import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconBgColor?: string;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  iconBgColor = "bg-stone-100",
  iconColor = "text-stone-700",
}) => {
  return (
    <div className="w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5">
      <div className="w-full h-max rounded px-4 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="font-sans font-medium antialiased text-sm text-stone-500 truncate">
              {title}
            </p>
            <h4 className="font-sans antialiased font-bold text-2xl text-stone-900 mt-1">
              {value}
            </h4>
            {trend && (
              <p
                className={`text-xs font-medium mt-1 ${
                  trend.isPositive ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {trend.isPositive ? "▲" : "▼"} {Math.abs(trend.value)}% vs last
                month
              </p>
            )}
          </div>
          <div className={`rounded-full p-3 ${iconBgColor} ml-3 flex-shrink-0`}>
            <div className={`w-6 h-6 ${iconColor}`}>{icon}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
