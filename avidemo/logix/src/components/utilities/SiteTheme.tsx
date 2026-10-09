'use client';

import { useEffect, JSX } from 'react';
import { getSiteThemeClass } from 'lib/site-theme';

export function SiteTheme({ siteName }: { siteName: string | undefined }): JSX.Element | null {
  useEffect(() => {
    // A theme can be several classes (e.g. 'site-financial site-logix'); classList needs them split.
    const themeClasses = getSiteThemeClass(siteName).split(' ');

    document.body.classList.add(...themeClasses);

    return () => {
      document.body.classList.remove(...themeClasses);
    };
  }, [siteName]);

  return null;
}
