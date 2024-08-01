/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";



const editBlog=async(title:string|undefined,description:string|undefined,id:number)=>{
    
    const res = await fetch(`http://localhost:3020/blog/edit/${id}`,{
       method:"PUT",
       headers:{
           "Content-type":"application/json"
       },
       body:JSON.stringify({title,description,id}),
    })
    return res.json();
   }
  

const getBlogById=async(id:number)=>{
    
    const res = await fetch(`http://localhost:3020/blog/edit/${id}`)     
    const data=await res.json();
    return data.post;
   }
      
   
   
   const page=({params}:{params:{id:number}})=>{
       
       const router=useRouter()
       
       const titleref=useRef<HTMLInputElement|null>(null);
       const descriptionref=useRef<HTMLTextAreaElement|null>(null);
       
    useEffect(()=>{
        getBlogById(params.id).then((data)=>{
            titleref.current!.value=data.title
            descriptionref.current!.value=data.description
        }).catch(err=>{
            toast.error("エラー発生",{id:"1"})
        })
    },[])
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        toast.loading('編集です',{id:"1"})
        await editBlog(titleref.current?.value,descriptionref.current?.value,params.id)
        toast.success("編集完了",{id:"1"})
        router.push("/")
        router.refresh()
    }
    return (
        <>
        <Toaster></Toaster>
        <div className="w-full m-auto flex my-4">
            <div className="flex flex-col justify-center items-center m-auto">
            <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
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
                更新
                </button>
                <button className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
                削除
                </button>
            </form>
            </div>
        </div>
        </>
)
}

export default page;