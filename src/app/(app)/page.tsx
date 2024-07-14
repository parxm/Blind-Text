import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link'


const page = () => {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div className="max-w-2xl w-full space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Share Your Voice Anonymously
        </h1>
        <p className="mt-4 text-muted-foreground">
          Speak your mind without fear of judgment. Share your message with the world.
        </p>
        <Link
          href="/sign-up"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-6"
          prefetch={false}
        >
          Start your Anonymous Journey
        </Link>
      </div>
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-8 sm:px-10">
          <h2 className="text-2xl font-bold text-card-foreground">Recent Anonymous Messages</h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className=" h-10 w-10 rounded-full bg-[#e67e22] text-2xl flex items-center justify-center text-card-foreground">
                  ?
                </div>
              </div>
              <div>
                <p className="text-card-foreground">
                  "I've been struggling with anxiety lately, but sharing this anonymously has helped me feel a
                  little better."
                </p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                  <time dateTime="2023-07-14">July 14, 2023</time>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className=" h-10 w-10 rounded-full bg-[#8e44ad] text-2xl flex items-center justify-center text-card-foreground">
                  ?
                </div>
              </div>
              <div>
                <p className="text-card-foreground">
                  "I just wanted to share a message of hope and\n encouragement. You're not alone in your struggles."
                </p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                  <time dateTime="2023-07-12">July 12, 2023</time>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className=" h-10 w-10 rounded-full bg-[#1abc9c] text-2xl flex items-center justify-center text-card-foreground">
                  ?
                </div>
              </div>
              <div>
                <p className="text-card-foreground">
                  "I'm grateful for this platform to share my thoughts anonymously. It's been a safe space for me to
                  express myself."
                </p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                  <time dateTime="2023-07-10">July 10, 2023</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


    )
}

export default page