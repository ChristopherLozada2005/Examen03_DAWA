import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const data = await req.json();
  data.fechaFabricacion = new Date(data.fechaFabricacion);
  data.fechaVencimiento = new Date(data.fechaVencimiento);
  const medicamento = await prisma.medicamento.create({ data });
  return NextResponse.json(medicamento);
}

export async function GET() {
  const medicamentos = await prisma.medicamento.findMany({
    include: { especialidad: true },
  });
  return NextResponse.json(medicamentos);
}
