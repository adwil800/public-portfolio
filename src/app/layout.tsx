export default function RootLayout({children}: Readonly<{
    children: React.ReactNode; params: { locale: string };
}>,) {
    return children;
}