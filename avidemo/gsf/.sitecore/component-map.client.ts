// Client-safe component map for App Router
import { NextjsContentSdkComponent } from '@sitecore-content-sdk/nextjs';


import { BYOCClientWrapper, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in import section
import * as TextBannerTextTopdev from 'src/components/text-banner/TextBannerTextTop.dev';
import * as TextBannerDefaultdev from 'src/components/text-banner/TextBannerDefault.dev';
import * as TextBannerBlueTitleRightdev from 'src/components/text-banner/TextBannerBlueTitleRight.dev';
import * as TextBanner02dev from 'src/components/text-banner/TextBanner02.dev';
import * as TextBanner01dev from 'src/components/text-banner/TextBanner01.dev';
import * as TextBanner from 'src/components/text-banner/TextBanner';
import * as TestimonialCarousel from 'src/components/testimonial-carousel/TestimonialCarousel';
import * as MultiPromoTabs from 'src/components/multi-promo-tabs/MultiPromoTabs';
import * as MultiPromo from 'src/components/multi-promo/MultiPromo';
import * as ImageOptimizationcontext from 'src/components/image/image-optimization.context';
import * as ImageWrapperclient from 'src/components/image/ImageWrapper.client';
import * as Icon from 'src/components/icon/Icon';
import * as HeroImageBackgrounddev from 'src/components/hero/HeroImageBackground.dev';
import * as Hero from 'src/components/hero/Hero';
import * as GlobalHeaderDefaultdev from 'src/components/global-header/GlobalHeaderDefault.dev';
import * as GlobalHeader from 'src/components/global-header/GlobalHeader';
import * as GlobalFooterDefaultdev from 'src/components/global-footer/GlobalFooterDefault.dev';
import * as GlobalFooter from 'src/components/global-footer/GlobalFooter';
import * as FooterNavigationColumn from 'src/components/global-footer/FooterNavigationColumn';
import * as AnimatedSectiondev from 'src/components/animated-section/AnimatedSection.dev';
import * as AlertBannerdev from 'src/components/alert-banner/AlertBanner.dev';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['TextBannerTextTop', { ...TextBannerTextTopdev }],
  ['TextBannerDefault', { ...TextBannerDefaultdev }],
  ['TextBannerBlueTitleRight', { ...TextBannerBlueTitleRightdev }],
  ['TextBanner02', { ...TextBanner02dev }],
  ['TextBanner01', { ...TextBanner01dev }],
  ['TextBanner', { ...TextBanner }],
  ['TestimonialCarousel', { ...TestimonialCarousel }],
  ['MultiPromoTabs', { ...MultiPromoTabs }],
  ['MultiPromo', { ...MultiPromo }],
  ['ImageOptimization', { ...ImageOptimizationcontext }],
  ['ImageWrapper', { ...ImageWrapperclient }],
  ['Icon', { ...Icon }],
  ['HeroImageBackground', { ...HeroImageBackgrounddev }],
  ['Hero', { ...Hero }],
  ['GlobalHeaderDefault', { ...GlobalHeaderDefaultdev }],
  ['GlobalHeader', { ...GlobalHeader }],
  ['GlobalFooterDefault', { ...GlobalFooterDefaultdev }],
  ['GlobalFooter', { ...GlobalFooter }],
  ['FooterNavigationColumn', { ...FooterNavigationColumn }],
  ['AnimatedSection', { ...AnimatedSectiondev }],
  ['AlertBanner', { ...AlertBannerdev }],
]);

export default componentMap;
