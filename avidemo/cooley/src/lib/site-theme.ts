const SITE_THEME_CLASS_MAP: Record<string, string> = {
  Financial: 'site-financial',
  Services: 'site-services',
  Cooley: 'site-cooley',
};

const DEFAULT_SITE_THEME_CLASS = 'site-cooley';

export function getSiteThemeClass(siteName: string | undefined): string {
  if (!siteName) {
    return DEFAULT_SITE_THEME_CLASS;
  }

  return SITE_THEME_CLASS_MAP[siteName] ?? DEFAULT_SITE_THEME_CLASS;
}
