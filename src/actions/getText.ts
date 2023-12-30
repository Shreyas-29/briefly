"use server";

import oneai from "@/lib/oneai";
import { revalidatePath } from "next/cache";

const getText = async (text: string, length: number) => {

    try {
        const pipeline = new oneai.Pipeline(
            oneai.skills.summarize({ max_length: length }),
        );

        const output = await pipeline.run(text);

        if (output && output.summary && output.summary.text) {
            return output.summary.text as string;
        } else {
            console.log("Error in summarization API");
            return "";
        }

    } catch (error) {
        console.log("Error in summarization API: ", error);
    }
    revalidatePath("/");
};


export default getText;
