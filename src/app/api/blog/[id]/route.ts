import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const response = await fetch(`http://localhost:3020/api/blog/${id}`);
    const blog = await response.json();
    res.status(200).json(blog);
  } else if (req.method === "PUT") {
    const { title, description } = req.body;
    const response = await fetch(`http://localhost:3020/api/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const updatedBlog = await response.json();
    res.status(200).json(updatedBlog);
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
