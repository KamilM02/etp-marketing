import "./globals.css";
import Header from "./components/Header";
import FooterComponent from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "../redux/store";


export const metadata = {
  title: "Event Ticketing Platform",
  description: "An event ticketing platform using Next.js and TailwindCSS.",
  icons: {
    icon: "tickets_white.svg",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="bg-white flex flex-col min-h-screen w-full overflow-x-hidden">
        <Provider store={store}>
          <Header />
          <main className="flex-1 flex items-center justify-center p-4">
            {children}
          </main>
          <FooterComponent />
        </Provider>
      </body>
    </html>
  );
}
