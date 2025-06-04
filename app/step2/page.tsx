"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Step3 from "../step3/page";
import ReactMarkdown from 'react-markdown';


interface Step2Props{
    structuredData:string;
    onBack:()=>void;
    
}

export default function Step2({structuredData,onBack}:Step2Props){

    const [step,setStep] =useState(2);

    if (step==3){
        return(
            <Step3 
            structuredData={structuredData} 
            onBack={() => setStep(2)}
            onSave={(structured: any) => console.log("Step3 input:", {structured})}/>
        );
        
    }
    return(
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="w-full max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-2 text-left">Knowledge Base</h1>
                <p className="text-sm text-gray-500 mb-6 text-left">
                Manage what your AI assistant knows about your clinic
                </p>
                <Tabs className="mb-6">
                    <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="step1" disabled>Step 1</TabsTrigger>
                        <TabsTrigger value="step2" onClick={() => setStep(2)}>Step 2</TabsTrigger>
                        <TabsTrigger value="step3" disabled>Step 3</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Card className="w-full p-6 bg-gray-50 border border-gray-200 min-h-[600px] overflow-visible">
                    <h2 className="text-lg font-medium mb-4">Review your structured KB data</h2>

                    <div className="w-full p-4 border rounded-md text-sm font-mono whitespace-pre-wrap bg-white min-h-[400px]">
                        <ReactMarkdown>{structuredData}</ReactMarkdown>
                    </div>
                    <div className="flex justify-between mt-4">
                        <Button onClick={onBack}>Back</Button>
                        <Button onClick={() => setStep(3)}>Next</Button>
                    </div>
                </Card>

            </div>
        </div>
    );

}
