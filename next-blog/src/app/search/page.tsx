"use client"

import { CardBlog } from "@/components/card"
import Wrapper from "@/components/wrapper"
import { getBlogs } from "@/lib/blog"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDebounce } from "use-debounce"

export default function SearchBlog() {
    const searchParams = useSearchParams()
    const querySearch = searchParams.get('search')
    const searchRef = useRef<HTMLInputElement | null>(null)
    const [data, setData] = useState([])
    const [search, setSearch] = useState<string>( querySearch || '')
    const [value] = useDebounce(search, 1000)
    const router = useRouter()

    const handleChange = () => {
        if(searchRef.current) {
            setSearch(searchRef.current.value)
        }
    }

    const getData = async () => {
        try {
            router.push(`?search=${value}`)
            const { blogs } = await getBlogs(value)
            setData(blogs)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData()
    }, [value])

    return(
        <Wrapper>
            <div className="flex w-full justify-center">
                <input 
                    onChange={handleChange}
                    ref={searchRef}
                    defaultValue={value}
                    type="search" 
                    className="border p-2 border-gray-500 h-10 w-full max-w-[500px] rounded-md" 
                    placeholder="Search Blog"
                />
            </div>
            <div className="my-14">
                <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
                    {
                        data.map((items: any) => {
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
            </div>
        </Wrapper>
    )
}