'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Especialidad } from '@/app/especialidades/page';

export default function NuevoMedicamento() {
  const router = useRouter();
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [form, setForm] = useState({
    descripcionMed: '',
    fechaFabricacion: '',
    fechaVencimiento: '',
    Presentacion: '',
    stock: 0,
    precioVentaUni: 0,
    precioVentaPres: 0,
    Marca: '',
    CodEspec: 0,
  });

  useEffect(() => {
    fetch('/api/especialidad')
      .then(res => res.json())
      .then(setEspecialidades);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['stock', 'precioVentaUni', 'precioVentaPres', 'CodEspec'].includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/medicamento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/medicamentos');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Nuevo Medicamento</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="descripcionMed" placeholder="Descripción" className="input" onChange={handleChange} required />
          <input type="date" name="fechaFabricacion" className="input" onChange={handleChange} required  placeholder='yyyy/mm/dd'/>
          <input type="date" name="fechaVencimiento" className="input" onChange={handleChange} required placeholder='yyyy/mm/dd' />
          <input name="Presentacion" placeholder="Presentación" className="input" onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock" className="input" onChange={handleChange} required />
          <input type="number" step="0.01" name="precioVentaUni" placeholder="Precio Unitario" className="input" onChange={handleChange} required />
          <input type="number" step="0.01" name="precioVentaPres" placeholder="Precio Presentación" className="input" onChange={handleChange} required />
          <input name="Marca" placeholder="Marca" className="input" onChange={handleChange} required />
          <select name="CodEspec" className="input col-span-2" onChange={handleChange} required title='select'>
            <option value="">-- Selecciona Especialidad --</option>
            {especialidades.map(e => (
              <option key={e.CodEspec} value={e.CodEspec}>{e.descripcionEsp}</option>
            ))}
          </select>
          <button type="submit" className="col-span-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

const input = "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black";
