import { NextRequest,NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// api for saving the data to lowdb (db/knowledgebase.json)
export async function POST(req:NextRequest){
    try{
        const finalText = await req.json();
        const db = await getDb();

        db.data!.entries.push({
            id:uuidv4(),
            content:finalText,
            timestamp:new Date().toISOString(),

        });
        await db.write();

        return NextResponse.json({success:true});
    }
    catch(error){
        console.error("Error saving final text ",error);
        return NextResponse.json({success:false,error:"Could not save data"},{status:500});
    }
}