"use client";

import { useRouter } from "next/navigation";
import router from "next/router";
import React, { Fragment, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};

const updateBlog = async (data: UpdateBlogParams) => {
  try {
    const res = fetch(`http://localhost:3020/api/blog/${data.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await res).json();
  } catch (error) {
    console.log(error);
  }
};

const getBlogById = async (id: number) => {
  const res = await fetch(`http://localhost:3020/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const deleteBlog = async (id: number) => {
  const res = fetch(`http://localhost:3020/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const EditBlog = ({ params }: { params: { id: string } }) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request 🚀", { id: "1" });

      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });

      toast.success("Blog Posted Successfully", { id: "1" });

      router.push("/");
      router.refresh();
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting Blog", { id: "2" });
    await deleteBlog(parseInt(params.id));
  };

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getBlogById(parseInt(params.id))
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("Fetching Completed", { id: "1" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Fetching Blog", { id: "1" });
      });
  }, [params.id]);

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Edit a Wonderful Blog 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Update
            </button>
            <button
              onClick={handleDelete}
              className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export async function generateStaticParams() {
  const res = await fetch("http://localhost:3020/api/blog");
  const blogs = await res.json();

  return blogs.map((blog: { id: string }) => ({
    id: blog.id,
  }));
}

export default EditBlog;
