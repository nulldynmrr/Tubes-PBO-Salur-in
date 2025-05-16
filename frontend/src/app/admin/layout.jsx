import Navbar from "@/components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 pb-6">{children}</main>
    </div>
  );
}
