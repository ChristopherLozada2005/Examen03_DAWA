import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function POST( req: Request) {
    const data = await req.json();
    const especialidad = await prisma.especialidad.create({ data });
    return NextResponse.json(especialidad);
}

export async function GET() {
    const especialidades = await prisma.especialidad.findMany();
    return NextResponse.json(especialidades);
}