import Sidebar from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 min-h-0 overflow-y-auto p-6">{children}</div>
    </main>
  );
};

export default DashboardLayout;
