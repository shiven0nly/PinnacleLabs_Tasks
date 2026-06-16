import PostCard from "@/components/ui/PostCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  })

  //   console.log(sidebarData)

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(false)

  console.log(posts)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)

    const searchTermFromUrl = urlParams.get("searchTerm")
    const sortFromUrl = urlParams.get("sort")
    const categoryFromUrl = urlParams.get("category")

    console.log(searchTermFromUrl)

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "",
        category: categoryFromUrl || "",
      })
    }

    const fetchPosts = async () => {
      setLoading(true)

      const searchQuery = urlParams.toString()

      const res = await fetch(`/api/post/getposts?${searchQuery}`)

      if (!res.ok) {
        setLoading(false)
        return
      }

      if (res.ok) {
        const data = await res.json()
        setPosts(data.posts)
        setLoading(false)

        if (data.posts.length === 9) {
          setShowMore(true)
        } else {
          setShowMore(false)
        }
      }
    }

    fetchPosts()
  }, [location.search])

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(location.search)

    urlParams.set("searchTerm", sidebarData.searchTerm)
    urlParams.set("sort", sidebarData.sort)
    urlParams.set("category", sidebarData.category)

    const searchQuery = urlParams.toString()

    navigate(`/search?${searchQuery}`)
  }

  const handleShowMore = async () => {
    const numberOfPosts = posts.length
    const startIndex = numberOfPosts
    const urlParams = new URLSearchParams(location.search)

    urlParams.set("startIndex", startIndex)

    const searchQuery = urlParams.toString()

    const res = await fetch(`/api/post/getposts?${searchQuery}`)

    if (!res.ok) {
      return
    }

    if (res.ok) {
      const data = await res.json()

      setPosts([...posts, ...data.posts])

      if (data.posts.length === 9) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="p-6 md:w-1/4 bg-card shadow-md border-r border-border">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-muted-foreground">Filters</h2>

          {/* search input */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-muted-foreground">Search Term:</label>
            <Input
              placeholder="Search..."
              id="searchTerm"
              type="text"
              className="border-border rounded-md"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Sort By */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-muted-foreground">Sort By:</label>

            <Select
              onValueChange={(value) =>
                setSidebarData({ ...sidebarData, sort: value })
              }
              value={sidebarData.sort}
            >
              <SelectTrigger className="w-full border border-border">
                <SelectValue placeholder="Select Order" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Order by:</SelectLabel>

                  <SelectItem value="desc">Latest</SelectItem>
                  <SelectItem value="asc">Oldest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-muted-foreground">Category:</label>

            <Select
              onValueChange={(value) =>
                setSidebarData({ ...sidebarData, category: value })
              }
              value={sidebarData.category}
            >
              <SelectTrigger className="w-full border border-border">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category:</SelectLabel>

                  <SelectItem value="worldnews">World News</SelectItem>
                  <SelectItem value="sportsnews">Sports News</SelectItem>
                  <SelectItem value="localnews">Local News</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* submit button */}
          <Button
            type="submit"
            className="bg-destructive text-destructive-foreground py-2 px-4 rounded-md shadow-lg "
          >
            Apply Filters
          </Button>
        </form>
      </aside>

      <div className="w-full">
        <h1 className="text-2xl font-semibold text-foreground p-3 mt-5">
          News Articles:
        </h1>

        <Separator className="bg-border" />

        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-muted-foreground">No posts found.</p>
          )}

          {loading && (
            <p className="text-xl text-muted-foreground animate-pulse">Loading...</p>
          )}

          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}

          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-foreground text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search