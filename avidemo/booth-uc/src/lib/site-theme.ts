const SITE_THEME_CLASS_MAP: Record<string, string> = {
  Financial: 'site-financial',
  Services: 'site-services',
  // Component styles are scoped to .site-financial; .site-booth-uc only overrides tokens and fonts
  BoothUniversityCollege: 'site-financial site-booth-uc',
};

const DEFAULT_SITE_THEME_CLASS = 'site-financial site-booth-uc';

export function getSiteThemeClass(siteName: string | undefined): string {
  if (!siteName) {
    return DEFAULT_SITE_THEME_CLASS;
  }

  return SITE_THEME_CLASS_MAP[siteName] ?? DEFAULT_SITE_THEME_CLASS;
}
