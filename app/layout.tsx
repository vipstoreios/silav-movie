import "./globals.css";

export const metadata = {
  title: "Silav Movie",
  description: "Kurdish subtitle movies and drama platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ku">
      <body>{children}</body>
    </html>
  );
}
