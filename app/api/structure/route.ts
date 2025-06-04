import { NextRequest,NextResponse } from "next/server";
import OpenAI from "openai";

const openai=new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
});

// api to convert unstructured raw data to structured data
export async function POST(req:NextRequest){
    try{
        const {text}=await req.json();

        if (!text || typeof text !== "string") {
            return NextResponse.json({ error: "Invalid input: 'text' is required." }, { status: 400 });
        }

        const prompt = `
                    You are a smart assistant that organizes messy notes into clean, readable sections.

                    What you must do:
                    - Group related points together under **bold section titles** 
                    - Start each section with a clear heading, followed by a blank line, then relevant bullet points or statements
                    - Don't add any intros, summaries, or explanation — just structured output
                    - Do NOT invent content

                    Here is the raw unstructured input:
                    """${text}"""`

    
        const completion=await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages:[{role:'user',content:prompt}],
            temperature:0.7,
        });

        const structuredText=completion.choices[0].message.content;

        return NextResponse.json({structuredText});
    }
    catch(error:any){
        console.error("Structuring API error ",error);
        return NextResponse.json({error:'Failed structured Text'},{status:500});
    }
}