"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Info, Loader2, Send, X, Zap } from "lucide-react";
import React, { useState } from 'react';

const Container = () => {

    const [prompt, setPrompt] = useState<string>("");

    const [chatMessages, setChatMessages] = useState([]);

    const [showInfo, setShowInfo] = useState<boolean>(true);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const query = async (data: { inputs: string }) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
                {
                    headers: {
                        "Authorization": "Bearer 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",
                        "Content-Type": "application/json", // Make sure the content type is set to JSON
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.text(); // Get response as text
            const jsonResult = JSON.parse(result); // Parse response as JSON
            console.log("API response:", jsonResult); // Log the response
            return jsonResult;
        } catch (error) {
            console.error("Error querying model:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!prompt) return;

        try {
            const response = await query({ inputs: prompt });
            console.log("response", response);

            // Check if response is an array and has at least one element
            if (Array.isArray(response) && response.length > 0) {
                const aiResponse = response[0].generated_text; // Accessing the generated_text property
                console.log("ai - response", aiResponse);

                // Update chatMessages with user prompt and AI response
                const updatedChatMessages = [
                    ...chatMessages,
                    { type: 'user', text: prompt },
                    { type: 'ai', text: aiResponse }
                ];

                // @ts-ignore
                setChatMessages(updatedChatMessages);

                localStorage.setItem('chatMessages', JSON.stringify(updatedChatMessages));
            } else {
                console.error("Invalid response format:", response);
            }

            setPrompt("");
        } catch (error) {
            console.error("Error querying model:", error);
        }
    };

    return (
        <div className="relative w-full h-full max-w-3xl border border-background bg-background rounded-3xl">

            <div className="flex absolute z-20 rounded-b-3xl bottom-0 inset-x-0 items-center justify-center lg:bg-[#1c1c1e] pt-2 md:pb-2">
                <form onSubmit={handleSend} className="relative flex items-center w-full max-w-2xl gap-3 mx-auto border rounded-b-3xl md:rounded-lg border-border">
                    <Input
                        name="prompt"
                        value={prompt}
                        disabled={isLoading}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter a message here"
                        className="w-full border-none rounded-b-3xl md:rounded-lg focus:ring-0 focus:shadow-none bg-secondary"
                    />
                    <Button
                        size="sm"
                        type="submit"
                        // onClick={() => query2({ inputs: "Can you please let us know more details about your" })}
                        variant="outline"
                        disabled={!prompt || isLoading}
                        className="absolute top-0.5 right-1 rounded-full"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </Button>
                </form>
            </div>

            <div className="relative flex flex-col items-center justify-start w-full h-full max-w-2xl max-h-full pt-4 pb-16 mx-auto overflow-y-scroll scrollbar-hide">
                {chatMessages.length === 0 && (
                    <div className="flex-col mt-auto mb-8 text-sm text-center flexe text-primary/60">
                        <div className="mb-4">
                            <Zap className="w-6 h-6 mx-auto" />
                        </div>
                        <p className="">
                            Start a conversation with the AI
                        </p>
                        {showInfo && (
                            <div className="flex items-center px-4 py-2 mt-4 text-sm text-center border rounded-md border-border bg-secondary/40">
                                <p className="flex items-center text-primary/60">
                                    <Info className="w-5 h-5 mr-2" />
                                    Your chat will be removed once you refresh the page
                                </p>
                                <Button size="icon" variant="outline" className="w-6 h-6 ml-4" onClick={() => setShowInfo((prev) => !prev)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                {chatMessages.map((message: any, index) => {
                    console.log("message", message);
                    return (
                        <div key={index} className={cn(
                            "rounded-lg text-sm px-3 py-2 my-1.5 max-w-[80%] w-max break-words",
                            message.type === 'user' ? "bg-primary text-primary-foreground items-end ml-auto" : "bg-background text-primary items-start mr-auto",
                        )}>
                            {message.text}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Container
