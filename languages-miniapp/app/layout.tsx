import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";

export default async function Root({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<MiniKitProvider>
				<body className="text-gray-700">{children}</body>
			</MiniKitProvider>
		</html>
	)
}
