export interface IBlogs { 
    sys: { id:  number | null | undefined; }; 
    fields: {
        title: string;  
        slug: string;
        image: { fields: 
            { file: 
                { url: string; }; 
            }; 
        }; 
        author: { 
            fields: {
                avatar: { 
                    fields: { 
                        file: { url: string; }; 
                    }; 
                }; 
                name: string; 
                email: string; 
            }; 
        };
    }
}

export interface BlogInput {
    title: string;
    category: string;
    content: string;
    slug: string;
    image?: File | string | null
  }