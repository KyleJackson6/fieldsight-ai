import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <DashboardNavbar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </>
  );
}
