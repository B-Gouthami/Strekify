// src/pages/Home.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Home: React.FC = () => {
  const { addToast } = useToast();

  const handleButtonClick = () => {
    addToast("Welcome to Streakify! Start tracking your habits.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-3xl font-bold text-primary">Welcome to Streakify</h1>
      <p className="mt-4 text-lg text-muted">
        Track your habits, visualize progress, and build consistency.
      </p>
      <Button onClick={handleButtonClick} className="mt-6">
        Show Welcome Toast
      </Button>
    </div>
  );
};

export default Home;
