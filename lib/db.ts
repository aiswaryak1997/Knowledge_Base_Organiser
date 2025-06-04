import { Low,JSONFile } from "lowdb";
import { join } from "path";

type Data ={
    entries:{id: any;content: string;timestamp: string}[];
};

const file=join(process.cwd(),'db','knowledgebase.json');
const adapter = new JSONFile<Data>(file);
const db = new Low<Data>(adapter);

export const getDb=async()=>{
    await db.read();
    db.data||={entries:[]};
    return db;
};