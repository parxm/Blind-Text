"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const MessagePage = () => {
  //@ts-ignore
  const currenturl=window.location.href
  console.log(currenturl)
  const parts =currenturl.split('/')
  const username = parts[parts.length-1]
  console.log(username)
 
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const initialMessage =
    "what's your favourite movie || Hello nigga || Where do you see yourself in the next 5 years";

  const handleSuggestMessage = async () => {
    try {
      const response = await axios.post("/api/suggest-messages");
      const messages = response.data.data.split("||");

      setSuggestedMessages(messages);
      toast({
        title: "Suggested Messages",
        description: "Fetching messages",
      });
    } catch (error) {
      console.log("Error fetching messages:", error);
      setError("Unable to fetch messages");
      toast({
        title: "Error",
        description: "Unable to fetch messages",
      });
    }
  };

  const handleSelectMessage = (message: string) => {
    setInputValue(message);
  };

  const handleSendMessage=async()=>{
    
    try {
      
      const response = await axios.post('/api/send-message',{
        username:username,
        content:inputValue,
      })
    } catch (error) {
      toast({
        title:"Unable to send Messages",
        description:"User Stopped accepting messages for now"
      })
    }
    return toast({
      title:"Message sent successfully"
    })
   

  }

  return (
    <div className="min-h-screen flex flex-col mx-24">
      <main className="flex-1 flex justify-center items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Public profile link</CardTitle>
            <CardDescription>
              Send a message to the profile owner.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Your message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                className="min-h-[100px]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="py-3 items-end">
              <Button onClick={handleSuggestMessage}>Suggest Messages</Button>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Suggested messages</div>
              {suggestedMessages.length > 0 && (
                <div className="grid grid-cols-1 md:justify-start gap-2 md:flex-row flex-col">
                  {suggestedMessages.map((message, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelectMessage(message)}
                    >
                      {message}
                    </Button>
                  ))}
                </div>
              )}
              {error && <div className="text-red-500">{error}</div>}
            </div>
          </CardContent>
          <CardFooter>
            <Button  onClick={handleSendMessage}   className="ml-auto">Send message</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default MessagePage;
