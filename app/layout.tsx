
// These styles apply to every route in the application
import './globals.css'
import Header from "./components/Header";
import FooterComponent from "./components/Footer";

export const metadata = {
  title: "Event Ticketing Platform",
  description: "An event ticketing platform using Next.js and TailwindCSS.",
  icons: {
    icon: "/tickets_white.svg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white flex flex-col min-h-screen w-full overflow-x-hidden">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
        {children}
        </main>
        <FooterComponent />
      </body>
    </html>
  );
}
