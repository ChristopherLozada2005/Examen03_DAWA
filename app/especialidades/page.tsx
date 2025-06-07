'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export interface Especialidad {
  CodEspec: number;
  descripcionEsp: string;
}

export default function EspecialidadesPage() {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  useEffect(() => {
    fetch('/api/especialidad')
      .then(res => res.json())
      .then(setEspecialidades);
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/especialidad/${id}`, { method: 'DELETE' });
    setEspecialidades(especialidades.filter(e => e.CodEspec !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Especialidades</h1>
          <Link
            href="/especialidades/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            + Nueva
          </Link>
        </div>
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Código</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Descripción</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.map((e) => (
              <tr key={e.CodEspec} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-black">{e.CodEspec}</td>
                <td className="px-6 py-4 text-black">{e.descripcionEsp}</td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    href={`/especialidades/${e.CodEspec}/edit`}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(e.CodEspec)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {especialidades.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-black">
                  No hay especialidades registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
