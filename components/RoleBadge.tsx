function RoleBadge({ role }: { role: string }) {
  const roleColor = {
    admin: "bg-yellow-200 text-yellow-900",
    student: "bg-green-200 text-green-900",
    user: "bg-blue-200 text-blue-900",
  }[role.toLowerCase()] || "bg-gray-200 text-gray-800";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${roleColor} capitalize`}
    >
      {role}
    </span>
  );
}
