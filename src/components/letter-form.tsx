'use client';

import type { LetterType, FormFieldConfig } from '@/lib/types';
import { letterTypeConfigurations } from '@/config/letter-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface LetterFormProps {
  letterType: LetterType;
  onSubmit: (data: Record<string, string>) => void;
  onBack: () => void;
  isLoading: boolean;
}

export function LetterForm({ letterType, onSubmit, onBack, isLoading }: LetterFormProps) {
  const config = letterTypeConfigurations[letterType];
  const Icon = config.icon;

  const formSchema = z.object(
    config.formFields.reduce((acc, field) => {
      acc[field.name] = field.validation;
      return acc;
    }, {} as Record<string, z.ZodTypeAny>)
  );

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: config.formFields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || (field.type === 'textarea' ? '' : '');
      return acc;
    }, {} as any),
  });

  const handleFormSubmit = (values: FormValues) => {
    const userDetails: Record<string, string> = {};
    config.formFields.forEach(field => {
      userDetails[field.label] = String(values[field.name]);
    });
    onSubmit(userDetails);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Icon className="h-7 w-7 text-primary" />
            {config.label} Details
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onBack} aria-label="Go back to letter type selection">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <CardDescription>Please fill in the details below to generate your letter.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.formFields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as any}
                  render={({ field: formField }) => (
                    <FormItem className={field.colSpan === 2 ? 'md:col-span-2' : ''}>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {field.type === 'textarea' ? (
                          <Textarea placeholder={field.placeholder} {...formField} rows={3} className="resize-none" />
                        ) : field.type === 'select' && field.options ? (
                           <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder || 'Select an option'} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {field.options.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input type={field.type} placeholder={field.placeholder} {...formField} />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Letter'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
