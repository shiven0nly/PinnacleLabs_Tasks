import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Advertise = () => {
  return (
    <div className="flex flex-col md:flex-row p-3 border border-primary justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col p-3 w-full md:w-3/5">
        <h2 className="text-2xl font-semibold text-wrap">
          Want to know more about today's{" "}
          <span className="text-destructive">TOP 10</span> news?
        </h2>

        <p className="text-muted-foreground my-2">Checkout these top news articles!</p>

        <Button className="bg-primary text-primary-foreground text-md mt-2 h-min">
          <Link
            to={"https://google.com"}
            target="_blank"
            rel="noopener norefferer"
            className="text-wrap"
          >
            Stay Updated with Daily News: Your Go-To Resources
          </Link>
        </Button>
      </div>

      <div className="p-7 w-full md:w-2/5">
        <img
          src="https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="w-full"
        />
      </div>
    </div>
  )
}

export default Advertise