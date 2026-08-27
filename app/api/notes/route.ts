import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    const notes = await prisma.note.findMany();
    console.log(notes);
    return NextResponse.json(notes);
}

export async function POST(request:Request) {
    try{
        const {title,content} = await request.json();
        if (!title.trim() || !content.trim()) {
            return NextResponse.json(
                { message: "Title and content are required" },
                { status: 400 }
            );
        }
        const note = await prisma.note.create({
            data:{
                title,
                content
            }
        })
        return NextResponse.json({
            message:"Note Create Successfully.",
            data:note
        });
    }catch(error){
        return Response.json({
            message:"Failed to create note"
        })
    }
}