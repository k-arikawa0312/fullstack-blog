'use client'
import { useRouter } from "next/navigation";
import { title } from "process";
import React, { useRef } from "react"
import  {toast, Toaster } from "react-hot-toast";

const postBlog=async(title:string|undefined,description:string|undefined)=>{
    
 const res = await fetch(`http://localhost:3020/api/blog`,{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify({title,description}),
 })
 return res.json
}



const PostBlog=()=>{

    const router=useRouter()

    const titleref=useRef<HTMLInputElement|null>(null);
    const descriptionref=useRef<HTMLTextAreaElement|null>(null);
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        toast.loading('投稿中です',{id:"1"})
        await postBlog(titleref.current?.value,descriptionref.current?.value)
        router.push("/")
        router.refresh()
    }
    return (
    <>
    <Toaster></Toaster>
    <div className="w-full m-auto flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
        <form onSubmit={handleSubmit}>
          <input
           ref={titleref}
            placeholder="タイトルを入力"
            type="text"
            className="rounded-md px-4 w-full py-2 my-2"
          />
          <textarea
            ref={descriptionref}
            placeholder="記事詳細を入力"
            className="rounded-md px-4 py-2 w-full my-2"
          ></textarea>
          <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
            投稿
          </button>
        </form>
      </div>
    </div>
  </>)

}
export default PostBlog