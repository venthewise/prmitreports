// Fix: Import React to resolve 'Cannot find namespace 'React''.
import React from 'react';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}
