import "./globals.css";

export const metadata = {
  title: "Student Management System",
  description: "Student CRUD app built with Next.js, Tailwind CSS and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
