import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request, res: Response) {
    try {

        const API_KEY = process.env.TEXTRAZOR_API_KEY;

        const body = await req.json();

        const { text } = body;

        console.log("Text: ", text);

        const response = await axios.post(
            "https://api.textrazor.com/",
            {
                text,  // Specify the text you want to analyze
                extractors: ["entities", "topics", "words", "phrases", "dependency-trees", "relations", "entailments", "senses", "spelling"],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-TextRazor-Key": API_KEY,
                },
            }
        );

        console.log("response", response);

        const summarizedText = response.data.response.sentences
            .map((sentence: any) => sentence.extracted)
            .join(" ");

        console.log("summarizedText", summarizedText);

        return Response.json({ summarizedText }, { status: 200 });
    } catch (error) {
        console.log("Error in summarization API: ", error);
        return Response.json({ error }, { status: 500 });
    }
};
