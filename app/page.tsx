import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <div>
      <form action="" method="post">
      <h2>Title</h2>
      <input type="text" className="bg-white rounded-sm mb-10 text-black focus:ring-2 focus:ring-white/20" />
      <h2>Content</h2>
      <textarea name="" id="" className="bg-white rounded-sm text-black w-full focus:ring-2 focus:ring-white/20" rows={4} ></textarea>
      </form>
     </div>
    </div>
  );
}
