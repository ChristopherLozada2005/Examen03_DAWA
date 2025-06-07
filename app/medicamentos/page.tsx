'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Especialidad } from '@/app/especialidades/page';

interface Medicamento {
  CodMedicamento: number;
  descripcionMed: string;
  fechaFabricacion: string;
  fechaVencimiento: string;
  Presentacion: string;
  stock: number;
  precioVentaUni: number;
  precioVentaPres: number;
  Marca: string;
  CodEspec: number;
  especialidad?: Especialidad;
}

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

  useEffect(() => {
    fetch('/api/medicamento')
      .then(res => res.json())
      .then(setMedicamentos);
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/medicamento/${id}`, { method: 'DELETE' });
    setMedicamentos(prev => prev.filter(m => m.CodMedicamento !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg overflow-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">Medicamentos</h1>
          <Link href="/medicamentos/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            + Nuevo
          </Link>
        </div>
        <table className="min-w-full table-auto text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-gray-500">Descripción</th>
              <th className="px-4 py-2 text-gray-500">Fabricación</th>
              <th className="px-4 py-2 text-gray-500">Vencimiento</th>
              <th className="px-4 py-2 text-gray-500">Stock</th>
              <th className="px-4 py-2 text-gray-500">Precio Unit.</th>
              <th className="px-4 py-2 text-gray-500">Precio Pres.</th>
              <th className="px-4 py-2 text-gray-500">Marca</th>
              <th className="px-4 py-2 text-gray-500">Especialidad</th>
              <th className="px-4 py-2 text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map(m => (
              <tr key={m.CodMedicamento} className="border-b hover:bg-gray-50 text-black">
                <td className="px-4 py-2">{m.descripcionMed}</td>
                <td className="px-4 py-2">{m.fechaFabricacion?.slice(0, 10)}</td>
                <td className="px-4 py-2">{m.fechaVencimiento?.slice(0, 10)}</td>
                <td className="px-4 py-2">{m.stock}</td>
                <td className="px-4 py-2">S/ {m.precioVentaUni.toFixed(2)}</td>
                <td className="px-4 py-2">S/ {m.precioVentaPres.toFixed(2)}</td>
                <td className="px-4 py-2">{m.Marca}</td>
                <td className="px-4 py-2">{m.especialidad?.descripcionEsp ?? '—'}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link href={`/medicamentos/${m.CodMedicamento}/edit`} className="text-blue-500 hover:underline">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(m.CodMedicamento)} className="text-red-500 hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {medicamentos.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-3 text-center text-gray-500">
                  No hay medicamentos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
