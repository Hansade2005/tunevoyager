import React from 'react';

const FloatingCredit: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg text-sm text-muted-foreground">
        Built by PiPilot
      </div>
    </div>
  );
};

export default FloatingCredit;