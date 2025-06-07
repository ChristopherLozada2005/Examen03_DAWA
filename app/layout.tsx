import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Gestión Médica',
  description: 'CRUD de medicamentos y especialidades',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-black">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-semibold text-indigo-600">ClinicaApp</Link>
              <div className="space-x-6 text-sm font-medium">
                <Link href="/medicamentos" className="text-gray-700 hover:text-indigo-600 transition">Medicamentos</Link>
                <Link href="/especialidades" className="text-gray-700 hover:text-indigo-600 transition">Especialidades</Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="mt-6">{children}</main>
      </body>
    </html>
  );
}
