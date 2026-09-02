'use client';

import type React from 'react';
import { Text, AppPlaceholder } from '@sitecore-content-sdk/nextjs';
import type { GlobalFooterProps } from './global-footer.props';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { ButtonBase } from '@/components/button-component/ButtonComponent';

export const GlobalFooterDefault: React.FC<GlobalFooterProps> = (props) => {
  const { fields, page, componentMap, rendering } = props;
  const { footerLogo, tagline, footerPromoTitle, footerPromoDescription, footerPromoLink, footerCopyright } =
    fields?.data?.datasource ?? {};

  if (fields) {
    return (
      <footer className="@container bg-quaternary text-quaternary-foreground relative w-full" role="contentinfo">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 @xl:px-8">
          <div className="mb-10 flex flex-col gap-8 @lg:flex-row @lg:items-start @lg:justify-between">
            <div className="max-w-xs">
              {footerLogo?.jsonValue?.value?.src && (
                <ImageWrapper image={footerLogo.jsonValue} className="mb-4 h-10 w-auto object-contain" page={page} />
              )}
              {tagline?.jsonValue?.value && (
                <Text tag="p" field={tagline.jsonValue} className="font-body text-sm opacity-80" />
              )}
            </div>

            {(footerPromoTitle?.jsonValue?.value || footerPromoDescription?.jsonValue?.value) && (
              <div className="max-w-sm">
                {footerPromoTitle?.jsonValue?.value && (
                  <Text tag="p" field={footerPromoTitle.jsonValue} className="font-heading mb-2 text-lg font-bold" />
                )}
                {footerPromoDescription?.jsonValue?.value && (
                  <Text
                    tag="p"
                    field={footerPromoDescription.jsonValue}
                    className="font-body mb-3 text-sm opacity-80"
                  />
                )}
                {footerPromoLink?.jsonValue?.value?.href && (
                  <ButtonBase buttonLink={footerPromoLink.jsonValue} variant="rounded-white" />
                )}
              </div>
            )}
          </div>

          {/* Navigation columns, authored as one FooterNavigationColumn per column */}
          <div className="grid grid-cols-2 gap-8 @md:grid-cols-3 @xl:grid-cols-5">
            <AppPlaceholder
              page={page}
              componentMap={componentMap}
              name="footer-columns"
              rendering={rendering}
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-quaternary-foreground/20 border-t">
          <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 px-4 py-6 text-xs opacity-80 @xl:px-8">
            {footerCopyright?.jsonValue?.value && <Text field={footerCopyright.jsonValue} encode={false} />}
          </div>
        </div>
      </footer>
    );
  }
  return <NoDataFallback componentName="Global Footer" />;
};
