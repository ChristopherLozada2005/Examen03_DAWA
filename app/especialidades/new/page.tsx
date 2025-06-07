'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevaEspecialidad() {
  const [descripcion, setDescripcion] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/especialidad', {
      method: 'POST',
      body: JSON.stringify({ descripcionEsp: descripcion }),
    });
    router.push('/especialidades');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Nueva Especialidad</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Descripción</label>
            <input
              type="text"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              placeholder="Ej. Cardiología"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
