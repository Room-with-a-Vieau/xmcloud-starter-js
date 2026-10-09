const SITE_THEME_CLASS_MAP: Record<string, string> = {
  Financial: 'site-financial',
  Services: 'site-services',
  // Logix layers its tokens over the Financial component styles (site-logix wins: it is defined later).
  LogixFederalCreditUnion: 'site-financial site-logix',
};

const DEFAULT_SITE_THEME_CLASS = 'site-financial site-logix';

export function getSiteThemeClass(siteName: string | undefined): string {
  if (!siteName) {
    return DEFAULT_SITE_THEME_CLASS;
  }

  return SITE_THEME_CLASS_MAP[siteName] ?? DEFAULT_SITE_THEME_CLASS;
}
