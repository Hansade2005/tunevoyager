import React from 'react';
import { cn } from '@/lib/utils';

const FloatingCredit: React.FC = () => {
  return (
    <div className={cn(
      'fixed bottom-16 right-4 z-40',
      'bg-background/90 backdrop-blur-sm border border-border rounded-lg',
      'px-3 py-2 shadow-lg',
      'text-sm text-muted-foreground',
      'transition-all duration-200 hover:bg-background/95'
    )}>
      Built by PiPilot
    </div>
  );
};

export default FloatingCredit;