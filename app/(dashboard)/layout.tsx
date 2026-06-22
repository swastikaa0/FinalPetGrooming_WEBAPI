import Header from "./_components/header";
import Footer from "./_components/footer";
import { AuthProvider } from "@/lib/contexts/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
    </AuthProvider>
  );
}