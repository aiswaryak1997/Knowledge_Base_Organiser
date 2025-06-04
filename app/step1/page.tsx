'use client';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Step2 from '../step2/page';

export default function Step1() {
    const [step,setStep] =useState(1);
    const [rawData,setRawData]=useState('');
    const [structuredData, setstructuredData] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        try{
            const files = event.target.files;

            if (!files || files.length === 0) {
                alert('Please select at least one .txt file.');
                return;
            }

            let combinedText = '';
            let filesRead = 0;

            // Loop through each file
            Array.from(files).forEach(file => {
                if (file.type === 'text/plain') {
                const reader = new FileReader();
                reader.onload = () => {
                    if (typeof reader.result === 'string') {
                    combinedText += reader.result + '\n\n'; 
                    filesRead++;

                    // After reading all files, update the raw text
                    if (filesRead === files.length) {
                        setRawData(combinedText);
                    }
                    }
                };
                reader.readAsText(file);
                } else {
                alert(`Skipped non-text file: ${file.name}`);
                }
            });
        }
        catch(error){
            console.error("File upload failed ",error)
        }
    };
    const isUploadDisabled = rawData.trim().length > 0;

    const handleStructured= async()=>{
        setLoading(true);
        try{
            const response = await fetch("/api/structure",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({text:rawData}),
            });
            const data = await response.json();
            setstructuredData(data.structuredText);
            setStep(2);
        }
        catch(error){
            console.error("Enrichment failed",error);
        }
        finally{
            setLoading(false);
        }
    };
    if (step === 2) {
        return (
            <Step2
                structuredData={structuredData}
                onBack={() => setStep(1)}
                
            />
        );
    }
    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="w-full max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-2 text-left">Knowledge Base</h1>
                <p className="text-sm text-gray-500 mb-6 text-left">
                    Manage what your AI assistant knows about your clinic
                </p>

                <Tabs className="mb-6">
                    <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="step1" onClick={() => setStep(1)}>Step 1</TabsTrigger>
                        <TabsTrigger value="step2" disabled>Step 2</TabsTrigger>
                        <TabsTrigger value="step3" disabled>Step 3</TabsTrigger>
                    </TabsList>
                </Tabs>

                <Card className="w-full p-6 bg-gray-50 border border-gray-200 min-h-[600px] overflow-visible">
                    <h2 className="text-lg font-medium mb-4">Provide your KB raw data</h2>

                    <Textarea
                    className="w-full p-2 border rounded-md text-sm font-mono "
                    placeholder="Paste your raw data here..."
                    value={rawData}
                    rows={20}
                    onChange={(e) => setRawData(e.target.value)}
                    />

                    <div className="flex items-center justify-between mt-4">
                        <label className={`cursor-pointer rounded-xl px-4 py-2 text-sm inline-block
                                        ${isUploadDisabled
                                        ? 'bg-gray-400 text-gray-700 pointer-events-none'  // disabled look
                                        : 'bg-emerald-600 text-white hover:bg-emerald-700'   // enabled look
                                        }`}>
                            <input type="file" accept=".txt" multiple onChange={handleFileUpload} className="hidden" disabled={isUploadDisabled}/>
                            <div>Upload File</div>
                        </label>
                        <Button
                        className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50"
                        onClick={handleStructured}
                        disabled={loading}
                        >
                        {loading ? "Loading..." : "Next"}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )

}
