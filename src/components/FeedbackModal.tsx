"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Textarea } from "./ui/textarea";

interface Props {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
};

const FeedbackModal = ({ isOpen, setIsOpen }: Props) => {

    const [feedback, setFeedback] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogContent className="z-[999]">
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
    )
};

export default FeedbackModal
