"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [title , setTitle]= useState("");
  const [content , setContent]= useState("");
  const [notes, setNotes] = useState<any[]>([]);
  const [message,setMessage]=useState("");
  const [selectedId,setSelectedId] = useState<string|null>(null);

  const getSelectedNote = (note:{id:string,title:string,content:string})=>
  {
    setSelectedId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }

  async function updateNote() {
    if (!selectedId) return;
    const res = await fetch(`/api/notes/${selectedId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const result = await res.json();
    setMessage(result.message);
    setSelectedId(null);
    setTitle("");
    setContent("");
    getNotes();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId) {
      updateNote();
    } else {
      addNote();
    }
  };
  async function deleteNote(id: string) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    setMessage(result.message);
    getNotes();
  }
  async function getNotes() {
    const response = await fetch("/api/notes");
    const data = await response.json();
    setNotes(data);
  }
  async function addNote() {
   const res= await fetch("/api/notes",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        title,
        content
      })
    })
    const result = await res.json();
    setMessage(result.message);
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
      <form action="" method="post" onSubmit={handleSubmit}>
      <h2>Title</h2>
      <input type="text" className="bg-white w-full rounded-sm mb-5 text-black focus:ring-2 focus:ring-white/20" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <h2>Content</h2>
      <textarea value={content}
            onChange={(e) => setContent(e.target.value)} className="bg-white  mb-3 rounded-sm text-black w-full focus:ring-2 focus:ring-white/20" rows={4} ></textarea>
            <button type="submit" className="w-full py-2 px-4 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-colors text-sm disabled:opacity-50">
            {selectedId?"Update Note":"Add Note"}
          </button>
          <p>{message}</p>
      </form>
     </div>
     <div className="mt-10">
      <h2 className="text-center mb-3">Notes</h2>
      {Array.isArray(notes) && notes.map((note) => (
  <div key={note.id}>
    <h3 className="bg-red-500 text-center rounded-sm p-2 ">Title: {note.title}</h3>
    <p className="bg-green-400 text-black p-1">Content: {note.content}</p>
    <div className="flex gap-2 mt-1">
                <button
                  onClick={() => getSelectedNote(note)}
                  className="flex-1 bg-blue-500 text-white py-1 text-xs rounded-sm hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="flex-1 bg-red-700 text-white py-1 text-xs rounded-sm hover:bg-red-800"
                >
                  Delete
                </button>
              </div>
  </div>
))}
     </div>
    </div>
  );
}
