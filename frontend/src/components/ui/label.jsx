export default function StatusLabel({ status }) {
  const baseStyle = "px-2 py-1 rounded-full text-xs font-medium capitalize";
  const variants = {
    diterima: "bg-green-100 text-green-700",
    ditolak: "bg-red-100 text-red-700",
    eksekusi: "bg-gray-100 text-gray-700",
  };

  const variantStyle =
    variants[status.toLowerCase()] || "bg-gray-200 text-gray-800";

  return <span className={`${baseStyle} ${variantStyle}`}>{status}</span>;
}
