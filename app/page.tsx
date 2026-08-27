"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // تحديث قائمة الملاحظات
  async function getNotes() {
    const response = await fetch("/api/notes");
    const data = await response.json();
    setNotes(data);
  }

  // تحديد الملاحظة لتعديلها
  const getSelectedNote = (note: { id: string; title: string; content: string }) => {
    setSelectedId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  // إضافة ملاحظة جديدة
  async function addNote() {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const result = await res.json();
    setMessage(result.message);
    setTitle("");
    setContent("");
    getNotes();
  }

  // حفظ التعديل
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

  // حذف الملاحظة
  async function deleteNote(id: string) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    setMessage(result.message);
    getNotes();
  }

  // التعامل مع إرسال الفورم (سواء إضافة أو تعديل)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId) {
      updateNote();
    } else {
      addNote();
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen py-10">
      <div>
        <form onSubmit={handleSubmit} className="w-80">
          <h2>Title</h2>
          <input
            type="text"
            className="bg-white w-full rounded-sm mb-5 text-black p-2 focus:ring-2 focus:ring-white/20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2>Content</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-white mb-3 rounded-sm text-black w-full p-2 focus:ring-2 focus:ring-white/20"
            rows={4}
          ></textarea>

          {/* تبديل الزرار بناءً على وجود selectedId */}
          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold rounded-md transition-colors text-sm ${
              selectedId ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            {selectedId ? "Save Update" : "Add Note"}
          </button>

          {/* زر لإلغاء التعديل إن أردت */}
          {selectedId && (
            <button
              type="button"
              onClick={() => {
                setSelectedId(null);
                setTitle("");
                setContent("");
              }}
              className="w-full mt-2 py-1 bg-gray-600 text-white rounded-md text-xs"
            >
              Cancel Edit
            </button>
          )}

          <p className="text-center mt-2 text-sm">{message}</p>
        </form>
      </div>

      <div className="mt-10 w-80">
        <h2 className="text-center mb-3 text-lg font-bold">Notes</h2>
        {Array.isArray(notes) &&
          notes.map((note) => (
            <div key={note.id} className="mb-4">
              <h3 className="bg-red-500 text-center rounded-t-sm p-2 font-bold">Title: {note.title}</h3>
              <p className="bg-green-400 text-black p-2">Content: {note.content}</p>
              
              {/* أزرار Update و Delete */}
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