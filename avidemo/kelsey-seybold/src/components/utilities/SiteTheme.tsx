'use client';

import { useEffect, JSX } from 'react';
import { getSiteThemeClass } from 'lib/site-theme';

export function SiteTheme({ siteName }: { siteName: string | undefined }): JSX.Element | null {
  useEffect(() => {
    // A theme can be several space-separated classes; classList rejects tokens with spaces
    const themeClasses = getSiteThemeClass(siteName).split(/\s+/).filter(Boolean);

    document.body.classList.add(...themeClasses);

    return () => {
      document.body.classList.remove(...themeClasses);
    };
  }, [siteName]);

  return null;
}
