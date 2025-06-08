import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();

  const medicamento = await prisma.medicamento.findUnique({
    where: { CodMedicamento: parseInt(id!) },
  });

  if (!medicamento) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  }

  return NextResponse.json(medicamento);
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  const data = await req.json();

  data.fechaFabricacion = new Date(data.fechaFabricacion);
  data.fechaVencimiento = new Date(data.fechaVencimiento);

  const medicamento = await prisma.medicamento.update({
    where: { CodMedicamento: parseInt(id!) },
    data,
  });

  return NextResponse.json(medicamento);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();

  await prisma.medicamento.delete({
    where: { CodMedicamento: parseInt(id!) },
  });

  return NextResponse.json({ message: 'Medicamento eliminado' });
}
