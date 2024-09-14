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