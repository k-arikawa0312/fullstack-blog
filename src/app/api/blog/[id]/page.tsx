export async function generateStaticParams() {
  const res = await fetch("http://localhost:3020/api/blog");
  const blogs = await res.json();

  return blogs.map((blog: { id: string }) => ({
    id: blog.id,
  }));
}

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`http://localhost:3020/api/blog/${params.id}`);
  const blog = await res.json();

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogPage;
