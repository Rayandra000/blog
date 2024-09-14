const base_url = process.env.BASE_URL_API || "http://localhost:8000/api";

export const getBlogs = async (search: string = "") => {
  try {
    const res = await fetch(`${base_url}/blogs?search=${search}`, { cache: "no-cache" });
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const result = await res.json();
      return { result, blogs: result.blogs, ok: res.ok };
    } else {
      const errorText = await res.text();
      console.error("Expected JSON response but got:", errorText);
      return { result: null, blogs: [], ok: false, error: errorText };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return { result: null, blogs: [], ok: false, error: (error as Error).message };
  }
};

export const getBlogSlug = async (slug: string) => {
  try {
    const res = await fetch(`${base_url}/blogs/${slug}`, { next: { revalidate: 3600 } });
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const result = await res.json();
      return { result, blog: result.blogs, ok: res.ok };
    } else {
      const errorText = await res.text();
      console.error("Expected JSON response but got:", errorText);
      return { result: null, blog: null, ok: false, error: errorText };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return { result: null, blog: null, ok: false, error: (error as Error).message };
  }
};
