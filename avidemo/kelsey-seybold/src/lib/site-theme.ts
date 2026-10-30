const SITE_THEME_CLASS_MAP: Record<string, string> = {
  Financial: 'site-financial',
  Services: 'site-services',
  // Component styles are scoped to .site-financial; .site-kelsey-seybold only overrides tokens and fonts
  'Kelsey-Seybold': 'site-financial site-kelsey-seybold',
};

const DEFAULT_SITE_THEME_CLASS = 'site-financial site-kelsey-seybold';

export function getSiteThemeClass(siteName: string | undefined): string {
  if (!siteName) {
    return DEFAULT_SITE_THEME_CLASS;
  }

  return SITE_THEME_CLASS_MAP[siteName] ?? DEFAULT_SITE_THEME_CLASS;
}
