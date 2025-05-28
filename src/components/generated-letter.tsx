
'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Copy, FilePlus2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GeneratedLetterProps {
  letterText: string;
  onGenerateAnother: () => void;
}

export function GeneratedLetter({ letterText, onGenerateAnother }: GeneratedLetterProps) {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);
  const [clientLetterText, setClientLetterText] = useState('');

  const [fontSize, setFontSize] = useState<number>(14); // Default 14px
  const [fontColor, setFontColor] = useState<string>('#000000'); // Default black
  const [letterBgColor, setLetterBgColor] = useState<string>('#F0F8FF'); // Default AliceBlue (light background)


  useEffect(() => {
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
        <CardDescription>Review your letter below. You can customize its appearance, copy it, or start a new one.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 border rounded-lg shadow-sm bg-card">
          <h3 className="text-lg font-semibold mb-3 text-primary">Customize Appearance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="font-size" className="text-sm font-medium text-foreground/80">Font Size</Label>
              <Select
                value={String(fontSize)}
                onValueChange={(value) => setFontSize(Number(value))}
              >
                <SelectTrigger id="font-size" className="mt-1 w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12px (Small)</SelectItem>
                  <SelectItem value="14">14px (Normal)</SelectItem>
                  <SelectItem value="16">16px (Medium)</SelectItem>
                  <SelectItem value="18">18px (Large)</SelectItem>
                  <SelectItem value="20">20px (X-Large)</SelectItem>
                  <SelectItem value="22">22px (XX-Large)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="font-color" className="text-sm font-medium text-foreground/80">Font Color</Label>
              <Input
                id="font-color"
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="mt-1 w-full h-10 p-1 border-input rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="bg-color" className="text-sm font-medium text-foreground/80">Background Color</Label>
              <Input
                id="bg-color"
                type="color"
                value={letterBgColor}
                onChange={(e) => setLetterBgColor(e.target.value)}
                className="mt-1 w-full h-10 p-1 border-input rounded-md"
              />
            </div>
          </div>
        </div>

        <Textarea
          value={clientLetterText}
          readOnly
          rows={15}
          className="leading-relaxed border-border p-4 rounded-md shadow-inner resize-none w-full"
          style={{
            fontSize: `${fontSize}px`,
            color: fontColor,
            backgroundColor: letterBgColor,
            lineHeight: '1.7', // Enhanced line-height for readability
          }}
          aria-label="Generated letter text"
        />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
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
