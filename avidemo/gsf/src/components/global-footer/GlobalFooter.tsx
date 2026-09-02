'use client';

import type React from 'react';
import type { GlobalFooterProps } from './global-footer.props';
import { GlobalFooterDefault } from './GlobalFooterDefault.dev';

// Default display of the component
export const Default: React.FC<GlobalFooterProps> = (props) => {
  const { isEditing } = props.page.mode;

  return <GlobalFooterDefault {...props} isPageEditing={isEditing} />;
};
