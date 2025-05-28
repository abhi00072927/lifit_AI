
'use client';

import { useState, useEffect } from 'react';
import type { LetterType } from '@/lib/types';
import { generateLetter, type GenerateLetterInput } from '@/ai/flows/generate-letter';
import { LetterTypeSelector } from '@/components/letter-type-selector';
import { LetterForm } from '@/components/letter-form';
import { GeneratedLetter } from '@/components/generated-letter';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [selectedLetterType, setSelectedLetterType] = useState<LetterType | null>(null);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelectLetterType = (type: LetterType) => {
    setSelectedLetterType(type);
    setGeneratedLetter(null);
    setError(null);
  };

  const handleFormSubmit = async (userDetails: Record<string, string>) => {
    if (!selectedLetterType) return;

    setIsLoading(true);
    setError(null);
    setGeneratedLetter(null);

    const input: GenerateLetterInput = {
      letterType: selectedLetterType,
      userDetails: userDetails,
    };

    try {
      const result = await generateLetter(input);
      if (result && result.letter) {
        setGeneratedLetter(result.letter);
      } else {
        throw new Error('AI did not return a letter.');
      }
    } catch (e: any) {
      console.error('Error generating letter:', e);
      setError(e.message || 'Failed to generate letter. Please try again.');
      toast({
        title: "Generation Failed",
        description: e.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedLetterType(null);
    setGeneratedLetter(null);
    setError(null);
    setIsLoading(false);
  };
  
  if (!isClient) {
    // Render a basic loading state or null during SSR/SSG to avoid hydration mismatches
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
         <RotateCcw className="h-12 w-12 text-primary animate-spin mb-4" />
         <p className="text-muted-foreground">Loading Likhit...</p>
      </div>
    );
  }

  const animationClasses = "animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out";

  return (
    <>
      <main className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-gradient-to-br from-background to-secondary/20">
        <header className="my-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary">
            Likhit
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your Personal AI Letter Writing Assistant
          </p>
        </header>

        <div className="w-full max-w-4xl">
          {error && (
            <Alert variant="destructive" className={`mb-6 ${animationClasses}`}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!selectedLetterType && !generatedLetter && (
            <div className={animationClasses}>
              <LetterTypeSelector onSelectType={handleSelectLetterType} />
            </div>
          )}

          {selectedLetterType && !generatedLetter && (
             <div className={animationClasses}>
              <LetterForm
                letterType={selectedLetterType}
                onSubmit={handleFormSubmit}
                onBack={handleReset}
                isLoading={isLoading}
              />
            </div>
          )}

          {generatedLetter && (
            <div className={animationClasses}>
              <GeneratedLetter
                letterText={generatedLetter}
                onGenerateAnother={handleReset}
              />
            </div>
          )}
        </div>
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Likhit. All rights reserved.</p>
          <p>Powered by Generative AI.</p>
        </footer>
      </main>
      <Toaster />
    </>
  );
}
