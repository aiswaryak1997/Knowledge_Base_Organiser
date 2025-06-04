"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';

interface SectionPair{
    original:string;
    enriched:string;
    accepted:boolean;
}

interface Step3Props{
    structuredData:string;
    onBack:()=>void;
    onSave:(finalText:string)=>void;
}

export default function Step3({structuredData,onBack,onSave}:Step3Props){
    const [sections,setSections] = useState<SectionPair[]>([]);
    const [loading,setLoading]=useState(true);
    const [showModal, setShowModal] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(null);

    useEffect(()=>{
        const fetchEnrichedData =async()=>{
                                  setLoading(true);
                                  try{
                                    const response = await fetch("/api/enrichSections",{
                                        method:"POST",
                                        headers:{"Content-Type":"application/json"},
                                        body:JSON.stringify({structuredData}),
                                    });
                                    
                                    const data = await response.json();
                                    const enriched = data.enrichedSections.map((section:any)=>({
                                        ...section,
                                        accepted:false,
                                    }));
                                    
                                    setSections(enriched);
                                  }
                                  catch(error){
                                    console.error("Failed to fetch enriched data ",error)
                                  }
                                  finally{
                                    setLoading(false);
                                  }
                                  
        };

        fetchEnrichedData();

    },[structuredData]);

    const toggleAccept = (index: number) => {
        const updated = [...sections];
        updated[index].accepted = !updated[index].accepted;
        setSections(updated);
    };

    const handleSave= async()=>{
        const finalText=sections.map((sec)=>(sec.accepted? sec.enriched:sec.original)).join("\n\n");

        try{
            const response =await fetch("api/saveKnowledge",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({finalText})
            });

            if (response.ok){
                setSaveStatus("success");

            }
            else{
                setSaveStatus("error");
            }
            setShowModal(true);

            onSave(finalText);
        }
        catch(error){
            setSaveStatus("error");
            setShowModal(true);

        }
        
    };

    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-2 text-left">Step 3: Final Enrichment</h1>
          <p className="text-sm text-gray-500 mb-6 text-left">
            Compare AI-suggested enrichments and accept or reject each.
          </p>
          <Tabs className="mb-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="step1" disabled>Step 1</TabsTrigger>
              <TabsTrigger value="step2" disabled>Step 2</TabsTrigger>
              <TabsTrigger value="step3" >Step 3</TabsTrigger>
            </TabsList>
          </Tabs>

          {loading ? (
            <p>Loading enriched suggestions...</p>
          ) : (
            sections.map((sec, index) => (
              <Card key={index} className="p-4 mb-4 border border-gray-300 bg-white">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h3 className="font-semibold mb-2">Original</h3>
                      <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded"><ReactMarkdown>{sec.original}</ReactMarkdown></pre>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">AI Enriched</h3>
                      <pre className="whitespace-pre-wrap bg-gray-50 p-2 rounded"><ReactMarkdown>{sec.enriched}</ReactMarkdown></pre>
                    </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <label className="flex items-center gap-2 text-sm font-semibold">
                          <input
                          type="checkbox"
                          checked={sec.accepted}
                          onChange={() => toggleAccept(index)}
                          className="accent-blue-600 w-4 h-4"
                          />
                          Accept Enriched Version
                  </label>
                </div>
              </Card>
            ))
          )}

          <div className="flex justify-end gap-4 mt-6">
            <Button  onClick={onBack}>
              Back
            </Button>
            <Button onClick={handleSave}>Save Knowledge Base</Button>
          </div>
        </div>
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
                  {saveStatus === "success" ? (
                      <>
                      <h2 className="text-lg font-bold mb-4 text-green-600"> Saved Successfully!</h2>
                      <p className="mb-6">Your knowledge base has been saved.</p>
                      </>
                    ) : (
                      <>
                      <h2 className="text-lg font-bold mb-4 text-red-600">Save Failed!</h2>
                      <p className="mb-6">Something went wrong. Please try again.</p>
                      </>
                  )}

                  <Button onClick={() => {
                      setShowModal(false);
                      if (saveStatus === "success") window.location.reload(); 
                      }}>
                      {saveStatus === "success" ? "Enrich new KB" : "Close"}
                  </Button>
                </div>
            </div>
        )}
      </div>
    );
}