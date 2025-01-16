import ServerLayout from "@/components/Layouts/ServerLayout";
import RootLayout from "@/components/Layouts/RootLayout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <ServerLayout>{children}</ServerLayout>
    </RootLayout>
  );
}
