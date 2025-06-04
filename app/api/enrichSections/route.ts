import { NextRequest,NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
});

// api for enriching the structured text
export async function POST(req:NextRequest){
    try{
        const {structuredData} =await req.json();
        const sections: string[] = structuredData
                                    .split(/\n(?=\*\*)/) // split on lines that start with bold headings (like **Title**)
                                    .map((s:any) => s.trim())
                                    .filter(Boolean);
       

        const enrichedSections= await Promise.all(
            sections.map(async (section:any)=>{
                const prompt = `
                                You're an assistant improving documentation.

                                Instructions:
                                - Rewrite the section heading to be clearer or more descriptive, if necessary.
                                - Improve the content for clarity and professionalism.
                                - Keep the original intent of both the heading and the body.
                                - Do not remove the section heading; always include one.
                                - Output only the enriched version with the heading followed by a blank line and improved content.

                                Original section:
                                """${section}"""
                            `;
            
                const completion = await openai.chat.completions.create({
                    model:'gpt-3.5-turbo',
                    messages:[{role:'user',content:prompt}],
                    temperature:0.7,
                }); 

                return{
                    original:section,
                    enriched: completion.choices[0].message.content,
                };
            })
        );
        return NextResponse.json({ enrichedSections });
    }
    catch (error) {
        console.error("Enrichment API error", error);
        return NextResponse.json({ error: "Failed to enrich sections" }, { status: 500 });
    }
}