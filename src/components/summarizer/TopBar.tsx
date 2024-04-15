"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useInput, useLoading, useTextLength } from '@/store';
import axios from 'axios';
import { HelpCircle, Loader2, MessageSquareText, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';


interface Props {

}

const TopBar: React.FC<Props> = () => {

    const { summarizedText, setSummarizedText } = useInput();

    const { textLength, setTextLength } = useTextLength();

    const { loading, setLoading } = useLoading();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [feedback, setFeedback] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isMobile = useMediaQuery('(max-width: 450px)');

    const handleDeleteText = () => {
        setSummarizedText("");
    };

    const handleSliderChange = (event: { target: { value: string; }; }) => {
        const value = parseInt(event.target.value, 10);
        setTextLength(value);
    };

    const handleSendFeedback = async () => {
        try {

            setIsLoading(true);

            if (!feedback) {
                toast.error("Please enter some feedback");
                setIsLoading(false);
                return;
            }

            const response = await axios.post("/api/feedback", {
                text: feedback
            });

            if (response.status === 200) {
                toast.success("Feedback sent successfully");
                setFeedback("");
                setIsLoading(false);
                setIsOpen(false);
            } else if (response.status === 401) {
                toast.error("Please login to send feedback");
                setIsLoading(false);
            } else {
                toast.error("Failed to send feedback");
                setIsLoading(false);
            }

        } catch (error) {
            console.log("Error sending feedback: ", error);
            toast.error("Failed to send feedback. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full px-3 py-2 overflow-x-scroll border-b md:w-full md:overflow-x-hidden md:px-5 h-14 border-border">
            <TooltipProvider>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-x-4 lg:gap-x-8">
                        <div className="flex items-center gap-x-4">
                            <span className="hidden font-medium sm:flex">
                                Modes:
                            </span>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button size={isMobile ? "xs" : "sm"}>
                                        Paragraph
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Generates a new paragraph from the input text.
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild className="hidden md:flex">
                                    <Button size="sm" variant="outline" disabled>
                                        Bullet Points
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Summarize the input text into bullet points.
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="flex items-center w-full gap-x-4">
                            <span className="text-sm font-medium md:text-base to-orange-500">
                                {isMobile ? "" : "Summary"} Length:
                            </span>
                            <div className="flex items-center justify-center gap-x-2 lg:gap-x-4">
                                <span className="hidden text-sm md:flex">
                                    Short
                                </span>
                                <span className="flex mt-0.5 -ml-2 text-xs text-muted-foreground md:hidden">
                                    ({textLength})
                                </span>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild className="mb-0.5">
                                        <input
                                            type="range"
                                            min={20}
                                            max={50}
                                            step={1}
                                            value={textLength}
                                            onChange={handleSliderChange}
                                            disabled={loading}
                                            className="customSlider disabled:opacity-70"
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {textLength} words
                                    </TooltipContent>
                                </Tooltip>
                                <span className="hidden text-sm md:flex">
                                    Long
                                </span>
                            </div>
                            <div className="items-center hidden md:flex">
                                <Tooltip delayDuration={-100}>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="w-4 h-4" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        For more than 50 words, upgrade to Pro.
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        {summarizedText?.length > 0 && (
                            <AlertDialog>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <AlertDialogTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </AlertDialogTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Delete all text
                                    </TooltipContent>
                                </Tooltip>

                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will delete all generated summary text.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteText}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <MessageSquareText className="w-5 h-5" />
                                        </Button>
                                    </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Give Feedback
                                </TooltipContent>
                            </Tooltip>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Give your feedback
                                    </DialogTitle>
                                    <DialogDescription>
                                        We are always looking for ways to improve our service. Please let us know what you think.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col gap-y-4">
                                    <Textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Enter your feedback here..."
                                        className="w-full outline-none resize-none"
                                    />
                                    <DialogFooter className="flex flex-row items-center justify-end w-full gap-x-4">
                                        <DialogClose asChild>
                                            <Button size="sm" variant="outline">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            size="sm"
                                            disabled={isLoading}
                                            onClick={handleSendFeedback}
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-5 h-5 mx-4 animate-spin" />
                                            ) : (
                                                "Send"
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </TooltipProvider>
        </div>
    )
}

export default TopBar
