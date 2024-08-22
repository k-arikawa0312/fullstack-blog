import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const response = await fetch(`http://localhost:3020/api/blog/${id}`);
  const blog = await response.json();
  return NextResponse.json(blog);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, description } = await req.json();
  const response = await fetch(`http://localhost:3020/api/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  const updatedBlog = await response.json();
  return NextResponse.json(updatedBlog);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const response = await fetch(`http://localhost:3020/api/blog/${id}`, {
    method: "DELETE",
  });
  const deletedBlog = await response.json();
  return NextResponse.json(deletedBlog);
}
