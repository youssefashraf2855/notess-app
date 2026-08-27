"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [title , setTitle]= useState("");
  const [content , setContent]= useState("");
  const [notes , setNotes]= useState([]);
  async function getNotes() {
    const response = await fetch("/api/notes");
    const data = await response.json();
    setNotes(data);
  }
  async function addNote() {
    await fetch("/api/notes",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        title,
        content
      })
    })
    setTitle("")
    setContent("")
    getNotes()
  }
    useEffect(() => {
    getNotes()
  }, [])
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <div>
      <form action="" method="post" onSubmit={(e)=>{
        e.preventDefault()
        addNote()
      }}>
      <h2>Title</h2>
      <input type="text" className="bg-white w-full rounded-sm mb-5 text-black focus:ring-2 focus:ring-white/20" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <h2>Content</h2>
      <textarea value={content}
            onChange={(e) => setContent(e.target.value)} className="bg-white  mb-3 rounded-sm text-black w-full focus:ring-2 focus:ring-white/20" rows={4} ></textarea>
            <button type="submit" className="w-full py-2 px-4 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-colors text-sm disabled:opacity-50">
            Add Note
          </button>
      </form>
     </div>
    </div>
  );
}
