import { CardBlog } from "@/components/card";
import Wrapper from "@/components/wrapper";
import { getBlogs } from "@/lib/blog";

export default async function Home() {
  const { blogs } = await getBlogs()
  return (
    <Wrapper>
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
        {
          blogs.map((items: any) => {
            return (
              <CardBlog 
                key={items.id}
                title={items.title} 
                slug={items.slug} 
                image={items.image}
                avatar={items.author.avatar}
                author={items.author.name}
                email={items.author.email}
              />
            )
          })
        }
      </div>
    </Wrapper>
  );
}
