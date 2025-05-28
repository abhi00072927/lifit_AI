
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
      <div className="text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold tracking-tight">Select Letter Type</h2>
        <p className="text-muted-foreground mt-2">
          Choose the type of letter you want to generate.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {types.map((type, index) => {
          const config = letterTypeConfigurations[type];
          const Icon = config.icon;
          return (
            <Card
              key={type}
              onClick={() => onSelectType(type)}
              className="cursor-pointer group transform transition-all duration-300 ease-out hover:shadow-2xl hover:scale-105 hover:-translate-y-1.5 hover:rotate-[-2deg]"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectType(type)}
              aria-label={`Select ${config.label} letter type`}
              data-aos="fade-up"
              data-aos-delay={`${100 * (index + 1)}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl group-hover:text-primary transition-colors">
                  <Icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
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
