'use client';

import type React from 'react';
import type { HeroProps } from './hero.props';
import { HeroImageBackground } from './HeroImageBackground.dev';

// Default display of the component
export const Default: React.FC<HeroProps> = (props) => {
  const { isEditing } = props.page.mode;

  return <HeroImageBackground {...props} isPageEditing={isEditing} />;
};
