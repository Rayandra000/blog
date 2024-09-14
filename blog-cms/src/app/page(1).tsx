import { CardBlog } from "@/components/card";
import Wrapper from "@/components/wrapper";
import { getBlogs } from "@/lib/blog";
import { IBlogs } from "@/type/blog";

export default async function Home() {
  const blogs = await getBlogs()
  return (
    <Wrapper>
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
        {
          blogs.map((items: IBlogs) => {
            return (
              <CardBlog 
                key={items.sys.id}
                title={items.fields.title} 
                slug={items.fields.slug} 
                image={items.fields.image.fields.file.url}
                avatar={items.fields.author.fields.avatar.fields.file.url}
                author={items.fields.author.fields.name}
                email={items.fields.author.fields.email}
              />
            )
          })
        }
      </div>
    </Wrapper>
  );
}
