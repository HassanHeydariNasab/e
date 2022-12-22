import type { ReactNode } from "react";
import ContextProviders from "./ContextProviders";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  );
}
