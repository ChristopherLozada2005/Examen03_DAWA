import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const especialidad = await prisma.especialidad.update({
    where: { CodEspec: parseInt(params.id) },
    data,
  });
  return NextResponse.json(especialidad);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.especialidad.delete({
    where: { CodEspec: parseInt(params.id) },
  });
  return NextResponse.json({ message: 'Especialidad eliminada' });
}
