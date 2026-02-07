import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string; // Tailwind color class for icon background (e.g., "bg-blue-500")
}

export function StatCard({ title, value, icon: Icon, trend, color = "bg-blue-500" }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2 font-bebas tracking-wide">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`text-xl ${color.replace("bg-", "text-")}`} />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span
            className={`font-medium ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-gray-400 ml-2">vs mes anterior</span>
        </div>
      )}
    </div>
  );
}
