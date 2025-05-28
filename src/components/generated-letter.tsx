'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Copy, FilePlus2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

interface GeneratedLetterProps {
  letterText: string;
  onGenerateAnother: () => void;
}

export function GeneratedLetter({ letterText, onGenerateAnother }: GeneratedLetterProps) {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);
  const [clientLetterText, setClientLetterText] = useState('');

  useEffect(() => {
    // Ensure letterText is only set on the client to avoid hydration issues
    // if it were, for instance, derived from a random process or timestamp in a more complex scenario.
    // For this specific case where it's AI generated, it's less critical but good practice.
    setClientLetterText(letterText);
  }, [letterText]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(clientLetterText);
      setHasCopied(true);
      toast({
        title: 'Copied to clipboard!',
        description: 'The generated letter has been copied.',
        variant: 'default',
      });
      setTimeout(() => setHasCopied(false), 2000); // Reset icon after 2 seconds
    } catch (err) {
      toast({
        title: 'Error copying',
        description: 'Could not copy the letter to clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Your Generated Letter</CardTitle>
        <CardDescription>Review your letter below. You can copy it or start a new one.</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={clientLetterText}
          readOnly
          rows={15}
          className="text-sm leading-relaxed bg-secondary/30 border-border p-4 rounded-md shadow-inner resize-none"
          aria-label="Generated letter text"
        />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
        <Button onClick={handleCopyToClipboard} variant="outline" className="w-full sm:w-auto">
          {hasCopied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
          {hasCopied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
        <Button onClick={onGenerateAnother} className="w-full sm:w-auto">
          <FilePlus2 className="mr-2 h-4 w-4" />
          Generate Another Letter
        </Button>
      </CardFooter>
    </Card>
  );
}
