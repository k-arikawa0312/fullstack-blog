import EditBlogClient from "./EditBlogClient";

interface EditBlogClientProps {
  id: string;
  initialData: any;
}

const EditBlog = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`http://localhost:3020/api/blog/${params.id}`);
  const blog = await res.json();

  return <EditBlogClient id={params.id} {...blog} />;
};

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3020/api/blog");
  const blogs = await res.json();

  return blogs.map((blog: { id: string }) => ({
    id: blog.id,
  }));
}

export default EditBlog;
