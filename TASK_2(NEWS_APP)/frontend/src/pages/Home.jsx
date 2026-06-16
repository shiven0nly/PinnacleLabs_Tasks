import Advertise from "./Advertise"
import PostCard from "@/components/ui/PostCard"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [posts, setPosts] = useState([])

  // console.log(posts)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts?limit=6")

      const data = await res.json()

      if (res.ok) {
        setPosts(data.posts)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to <span className="text-destructive"> Morning Dispatch</span>
        </h1>

        <p className="text-muted-foreground mt-3 text-lg">
          Your trusted source for the latest headlines, in-depth analysis, and
          breaking news every morning.
        </p>

        <p className="text-muted-foreground mt-1 italic">Stay informed, stay ahead.</p>

        <Link to={"/search"}>
          <Button className="bg-accent hover:bg-accent/80 text-accent-foreground py-3 px-6 rounded-full font-semibold shadow-lg flex items-center gap-2 w-fit">
            View all posts <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <section className="pb-16 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">
            Why You'll Love Morning Dispatch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title={"Diverse Content"}
              description={
                "Explore news on a variety of topics, from technology to lifestyle."
              }
              icon="📚"
            />

            <FeatureCard
              title={"Community Driven"}
              description={
                "Connect with writers and readers who share your interests."
              }
              icon="🌐"
            />

            <FeatureCard
              title={"Easy to Use"}
              description={
                "A seamless platform for sharing and discovering great content."
              }
              icon="🚀"
            />
          </div>
        </div>
      </section>

      <div className="p-3 bg-background">
        <Advertise />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Posts</h2>

            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Link
              to={"/search"}
              className="text-lg hover:underline text-center font-semibold"
            >
              View all news
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="p-6 bg-muted rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default Home