import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const data = await req.json();
  const especialidad = await prisma.especialidad.update({
    where: { CodEspec: parseInt(context.params.id) },
    data,
  });
  return NextResponse.json(especialidad);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await prisma.especialidad.delete({
    where: { CodEspec: parseInt(context.params.id) },
  });
  return NextResponse.json({ message: 'Especialidad eliminada' });
}
