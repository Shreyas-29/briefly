import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  try {
    const API_KEY = "r8_bmUqKNVvTc6QzuGm0lsiTwax7r0WUNU2fgocB";

    const input = await req.json();

    console.log("prompt: ", input);

    const prompt = `Generate a high-definition, realistic, 8k, Portrait, Focused  and cinematic ${input} With Ultrarealistic Textures, with proper lighting, shadows, contrast, and a focus on capturing intricate details. Ensure that the result is akin to a lifelike portrayal. Additionally, add a background blur to enhance the focus on the subject. Please add a comment in the code snippet if you make any changes or have any specific requests.`;

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer r8_bmUqKNVvTc6QzuGm0lsiTwax7r0WUNU2fgocB`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
          "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",
        input: { prompt: prompt },
      }),
    });

    console.log("response", response);

    const prediction = await response.json();

    console.log("summarizedText", prediction);

    return Response.json({ prediction }, { status: 200 });
  } catch (error) {
    console.log("Error in summarization API: ", error);
    return Response.json({ error }, { status: 500 });
  }
}
