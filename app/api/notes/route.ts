import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    const notes = await prisma.note.findMany();
    console.log(notes);
    return NextResponse.json(notes);
}

export async function POST(request:Request) {
    const {title,content} = await request.json();
    const note = await prisma.note.create({
        data:{
            title,
            content
        }
    })
    return NextResponse.json(note);
}