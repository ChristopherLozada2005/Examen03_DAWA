import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, context: { params: { id: string } }) {
    const { id } = context.params;
    const data = await req.json();
    const especialidad = await prisma.especialidad.update({
        where: { CodEspec: parseInt(id) },
        data,
    });
    return NextResponse.json(especialidad);
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    const { id } = context.params;
    await prisma.especialidad.delete({
        where: { CodEspec: parseInt(id) }
    });
    return NextResponse.json({ message: "Especialidad eliminada" });
}