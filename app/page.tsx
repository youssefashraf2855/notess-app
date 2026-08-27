import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <div>
      <form action="" method="post">
      <h2>Title</h2>
      <input type="text" />
      <h2>Content</h2>
      <input type="text" />
      </form>
     </div>
    </div>
  );
}
