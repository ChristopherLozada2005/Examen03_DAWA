import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop(); // obtener "id" de la URL
  const data = await req.json();

  const especialidad = await prisma.especialidad.update({
    where: { CodEspec: parseInt(id!) },
    data,
  });

  return NextResponse.json(especialidad);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();

  await prisma.especialidad.delete({
    where: { CodEspec: parseInt(id!) },
  });

  return NextResponse.json({ message: 'Especialidad eliminada' });
}
