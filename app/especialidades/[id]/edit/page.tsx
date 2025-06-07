'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditarEspecialidad() {
  const { id } = useParams();
  const router = useRouter();
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    fetch(`/api/especialidad/${id}`)
      .then(res => res.json())
      .then(data => setDescripcion(data.descripcionEsp));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/especialidad/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ descripcionEsp: descripcion }),
    });
    router.push('/especialidades');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Editar Especialidad</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Descripción</label>
            <input
              type="text"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              placeholder='Insert Changes'
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}
