
'use client';

import { useState, useEffect } from 'react';
import type { LetterType } from '@/lib/types';
import { generateLetter, type GenerateLetterInput } from '@/ai/flows/generate-letter';
import { LetterTypeSelector } from '@/components/letter-type-selector';
import { LetterForm } from '@/components/letter-form';
import { GeneratedLetter } from '@/components/generated-letter';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw, Bot, Sparkles, FileText as LottieIconPlaceholder } from 'lucide-react'; // Placeholder
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import LottiePlayer from 'react-lottie-player';
// To use a Lottie animation, uncomment the line below and provide your animation JSON
// import exampleLottieAnimation from '@/animations/example-lottie.json';


// Typing animation component
const TypingAnimation = () => {
  const texts = ["AI Letter Generator", "Smart Document Assistant", "Your Writing Partner"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index === texts.length) { // Loop back if desired, or stop
      // setIndex(0); 
      return;
    }

    if (subIndex === texts[index].length + 1 && !reverse) {
      setReverse(true);
      setTimeout(() => setBlink(false), 500); // Pause before deleting
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setBlink(true);
      setIndex((prev) => (prev + 1) % texts.length); // Cycle through texts
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === texts[index].length ? 1000 : 150, 75)); // Typing speed

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  // Blinker effect
  useEffect(() => {
    const blinkTimeout = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkTimeout);
  }, []);

  return (
    <div className="inline-block">
      <span className="text-lg sm:text-xl md:text-2xl font-semibold text-primary/80">
        {`${texts[index].substring(0, subIndex)}${blink ? "|" : " "}`}
      </span>
    </div>
  );
};


export default function HomePage() {
  const [selectedLetterType, setSelectedLetterType] = useState<LetterType | null>(null);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    AOS.init({
      duration: 800, // animation duration
      once: true, // whether animation should happen only once - while scrolling down
      offset: 50, // offset (in px) from the original trigger point
    });
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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
         <RotateCcw className="h-12 w-12 text-primary animate-spin mb-4" />
         <p className="text-muted-foreground">Loading Likhit...</p>
      </div>
    );
  }

  return (
    <>
      <main className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-[linear-gradient(120deg,_#f6f8ff,_#e0f7fa)] text-foreground">
        <header className="my-8 sm:my-12 text-center" data-aos="fade-down">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Bot className="h-12 w-12 text-primary" />
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-primary">
              Likhit
            </h1>
            <Sparkles className="h-8 w-8 text-amber-400" />
          </div>
          <p className="mt-2 text-muted-foreground text-lg sm:text-xl">
            Your Personal <TypingAnimation />
          </p>
        </header>

        {/* Lottie Animation Placeholder Section */}
        <div className="my-6 md:my-8 flex flex-col items-center" data-aos="zoom-in-up" data-aos-delay="200">
           {/* 
            To add a Lottie animation:
            1. Import your Lottie JSON file: `import myAnimationData from '@/animations/my-lottie.json';`
            2. Replace the placeholder div below with:
               `<LottiePlayer loop animationData={myAnimationData} play style={{ width: 200, height: 200 }} />`
            Ensure you have a Lottie JSON file in your project (e.g., in `src/animations`).
           */}
          <div className="p-4 bg-secondary/30 rounded-lg shadow-md flex items-center justify-center w-48 h-48">
            <LottieIconPlaceholder className="w-24 h-24 text-primary/50" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">Your Lottie Animation Here</p>
        </div>


        <div className="w-full max-w-4xl">
          {error && (
            <Alert variant="destructive" className="mb-6" data-aos="fade-up">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!selectedLetterType && !generatedLetter && (
            <div data-aos="fade-up" data-aos-delay="300">
              <LetterTypeSelector onSelectType={handleSelectLetterType} />
            </div>
          )}

          {selectedLetterType && !generatedLetter && (
             <div data-aos="fade-up" data-aos-delay="100">
              <LetterForm
                letterType={selectedLetterType}
                onSubmit={handleFormSubmit}
                onBack={handleReset}
                isLoading={isLoading}
              />
            </div>
          )}

          {generatedLetter && (
            <div data-aos="fade-up" data-aos-delay="100">
              <GeneratedLetter
                letterText={generatedLetter}
                onGenerateAnother={handleReset}
              />
            </div>
          )}
        </div>
        <footer className="mt-12 text-center text-sm text-muted-foreground" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <p>&copy; {new Date().getFullYear()} Likhit. All rights reserved.</p>
          <p>Powered by Generative AI.</p>
        </footer>
      </main>
      <Toaster />
    </>
  );
}
