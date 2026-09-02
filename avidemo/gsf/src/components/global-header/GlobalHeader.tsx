'use client';

import type React from 'react';
import type { GlobalHeaderProps } from './global-header.props';
import { GlobalHeaderDefault } from './GlobalHeaderDefault.dev';

// Default display of the component
export const Default: React.FC<GlobalHeaderProps> = (props) => {
  const { isEditing } = props.page.mode;

  return <GlobalHeaderDefault {...props} isPageEditing={isEditing} />;
};
