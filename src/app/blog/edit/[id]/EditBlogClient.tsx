"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};

const updateBlog = async (data: UpdateBlogParams) => {
  try {
    const res = await fetch(`http://localhost:3020/api/blog/${data.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      }),
      headers: {
        "Content-Type": "application/json",
      }),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const EditBlogClient = ({ id, initialData }: { id: string, initialData: { title: string, description: string } }) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (titleRef.current) titleRef.current.value = initialData.title;
    if (descriptionRef.current) descriptionRef.current.value = initialData.description;
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request 🚀", { id: "1" });

      await updateBlog({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        id: id,
      });

      toast.success("Blog Updated Successfully", { id: "1" });

      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={titleRef} type="text" placeholder="Title" />
      <textarea ref={descriptionRef} placeholder="Description"></textarea>
      <button type="submit">Update Blog</button>
      <Toaster />
    </form>
  );
};

export default EditBlogClient;