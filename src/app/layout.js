import "./globals.css";

import ClientLayout from "../client-layout";

import { ViewTransitions } from "next-view-transitions";

export const metadata = {
  title: "Roll Out Studios — MAIBO",
  description: "Creative Studio Website — MAIBO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
