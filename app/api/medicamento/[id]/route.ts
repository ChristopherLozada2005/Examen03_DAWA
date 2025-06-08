import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const medicamento = await prisma.medicamento.findUnique({
    where: { CodMedicamento: parseInt(params.id) },
  });

  if (!medicamento) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  }

  return NextResponse.json(medicamento);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  data.fechaFabricacion = new Date(data.fechaFabricacion);
  data.fechaVencimiento = new Date(data.fechaVencimiento);

  const medicamento = await prisma.medicamento.update({
    where: { CodMedicamento: parseInt(params.id) },
    data,
  });
  return NextResponse.json(medicamento);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.medicamento.delete({
    where: { CodMedicamento: parseInt(params.id) },
  });
  return NextResponse.json({ message: 'Medicamento eliminado' });
}
