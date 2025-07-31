type SummaryCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
};

function SummaryCard({ title, value, icon, color = "blue" }: SummaryCardProps) {
  const bgColor = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    yellow: "bg-yellow-50",
    red: "bg-red-50",
    gray: "bg-gray-50",
  }[color];

  return (
    <div
      className={`flex items-center gap-4 p-5 rounded-xl shadow-sm border border-gray-200 ${bgColor}`}
    >
      <div className="p-3 bg-white rounded-lg border">{icon}</div>
      <div>
        <p className="text-gray-500 font-semibold">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
