
'use client';

import type { LetterType, LetterTypeDetail } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { letterTypeConfigurations } from '@/config/letter-types';

interface LetterTypeSelectorProps {
  onSelectType: (type: LetterType) => void;
}

export function LetterTypeSelector({ onSelectType }: LetterTypeSelectorProps) {
  const types = Object.keys(letterTypeConfigurations) as LetterType[];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Select Letter Type</h2>
        <p className="text-muted-foreground mt-2">
          Choose the type of letter you want to generate.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {types.map((type) => {
          const config = letterTypeConfigurations[type];
          const Icon = config.icon;
          return (
            <Card
              key={type}
              onClick={() => onSelectType(type)}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary hover:scale-[1.03]"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectType(type)}
              aria-label={`Select ${config.label} letter type`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Icon className="h-6 w-6 text-primary" />
                  {config.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{config.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
