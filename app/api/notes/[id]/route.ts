import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH(
    request:Request,
    {params}:{params:Promise<{id:string}>}
) {
    try{
        const {id} = await params;
        const {title , content} = await request.json();
        
        const note = await prisma.note.update({
            where:{
                id:id,
            },
            data:{
                title,
                content
            }
        })
        return NextResponse.json({
            message:"Updated Succesfully",
            data:note
        });
    }catch(error){
        return NextResponse.json({
            message:"Failed to update",
        });
    }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await prisma.note.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Note is deleted",
    });
  } catch (err) {
    return NextResponse.json({
      message: "Failed to delete Note",
    });
  }
}