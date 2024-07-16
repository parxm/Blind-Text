"use client"
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


const handlesuggestmessage=()=>{

}

const messagepage = () => {
  return (
    <div className="min-h-screen flex flex-col mx-24">
    <main className="flex-1 flex justify-center items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Public profile link</CardTitle>
          <CardDescription>Send a message to the profile owner.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your message</Label>
            <Textarea id="message" placeholder="Enter your message" className="min-h-[100px]" />
          </div>
          <div className='py-3 items-end'>
            <Button onClick={handlesuggestmessage}>Suggest Messages</Button>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Quick messages</div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                Hi there!
              </Button>
              <Button variant="outline" size="sm">
                Great work!
              </Button>
              <Button variant="outline" size="sm">
                Let's connect
              </Button>
              <Button variant="outline" size="sm">
                Awesome profile
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Send message</Button>
        </CardFooter>
      </Card>
    </main>
  </div>
  )
}

export default messagepage