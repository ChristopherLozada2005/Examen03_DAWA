'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Especialidad } from '@/app/especialidades/page';

export default function EditarMedicamento() {
  const { id } = useParams();
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

  useEffect(() => {
    fetch(`/api/medicamento/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          descripcionMed: data.descripcionMed,
          fechaFabricacion: data.fechaFabricacion.slice(0, 10),
          fechaVencimiento: data.fechaVencimiento.slice(0, 10),
          Presentacion: data.Presentacion,
          stock: data.stock,
          precioVentaUni: data.precioVentaUni,
          precioVentaPres: data.precioVentaPres,
          Marca: data.Marca,
          CodEspec: data.CodEspec,
        });
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['stock', 'precioVentaUni', 'precioVentaPres', 'CodEspec'].includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/medicamento/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/medicamentos');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Editar Medicamento</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="descripcionMed" value={form.descripcionMed} placeholder="Descripción" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" required />
          <input type="date" name="fechaFabricacion" value={form.fechaFabricacion} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" required  placeholder='yyyy-mm-dd'/>
          <input type="date" name="fechaVencimiento" value={form.fechaVencimiento} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" required  placeholder='yyyy-mm-dd' />
          <input name="Presentacion" value={form.Presentacion} placeholder="Presentación" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" required />
          <input type="number" name="stock" value={form.stock} placeholder="Stock" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" required />
          <input type="number" name="precioVentaUni" value={form.precioVentaUni} placeholder="Precio Unitario" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" required />
          <input type="number" name="precioVentaPres" value={form.precioVentaPres} placeholder="Precio por Presentación" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" required />
          <input name="Marca" value={form.Marca} placeholder="Marca" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" required />
          <select name="CodEspec" value={form.CodEspec} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black col-span-2" required title='select'>
            <option value="">-- Selecciona Especialidad --</option>
            {especialidades.map(e => (
              <option key={e.CodEspec} value={e.CodEspec}>{e.descripcionEsp}</option>
            ))}
          </select>
          <button type="submit" className="col-span-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}
