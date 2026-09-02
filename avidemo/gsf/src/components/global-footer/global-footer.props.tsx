import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import type { OptionalComponentProps, PlaceholderComponentProps } from '@/lib/component-props';
import { PlaceholderProps } from '@/types/Placeholder.props';

export type GlobalFooterProps = PlaceholderComponentProps &
  PlaceholderProps &
  GlobalFooterFields & {
    isPageEditing: boolean;
  };

export type GlobalFooterFields = {
  fields: {
    data: {
      datasource: {
        footerLogo?: { jsonValue: ImageField };
        tagline?: { jsonValue: Field<string> };
        footerPromoTitle?: { jsonValue: Field<string> };
        footerPromoDescription?: { jsonValue: Field<string> };
        footerPromoLink?: { jsonValue: LinkField };
        footerCopyright?: { jsonValue: Field<string> };
      };
    };
  };
};

export type FooterNavigationLink = {
  link: {
    jsonValue: LinkField;
  };
};

export type FooterNavigationColumnProps = OptionalComponentProps & {
  fields: {
    data: {
      datasource: {
        header: {
          jsonValue: Field<string>;
        };
        children?: {
          results: FooterNavigationLink[];
        };
      };
    };
  };
};
