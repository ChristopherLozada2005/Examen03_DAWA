import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const medicamento = await prisma.medicamento.findUnique({
    where: { CodMedicamento: parseInt(context.params.id) },
  });

  if (!medicamento) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  }

  return NextResponse.json(medicamento);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const data = await req.json();
  data.fechaFabricacion = new Date(data.fechaFabricacion);
  data.fechaVencimiento = new Date(data.fechaVencimiento);

  const medicamento = await prisma.medicamento.update({
    where: { CodMedicamento: parseInt(context.params.id) },
    data,
  });
  return NextResponse.json(medicamento);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await prisma.medicamento.delete({
    where: { CodMedicamento: parseInt(context.params.id) },
  });
  return NextResponse.json({ message: 'Medicamento eliminado' });
}
