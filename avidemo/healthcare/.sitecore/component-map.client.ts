// Client-safe component map for App Router
import { NextjsContentSdkComponent } from '@sitecore-content-sdk/nextjs';


import { BYOCClientWrapper, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in import section
import * as Title from 'src/components/title/Title';
import * as ThemeSwitcher from 'src/components/theme-switcher/ThemeSwitcher';
import * as ThemeEditor from 'src/components/theme-editor/ThemeEditor';
import * as SocialFollow from 'src/components/social-follow/SocialFollow';
import * as SectionWrapper from 'src/components/section-wrapper/SectionWrapper';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Reviews from 'src/components/reviews/Reviews';
import * as Promo from 'src/components/promo/Promo';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Navigation from 'src/components/navigation/Navigation';
import * as LinkList from 'src/components/link-list/LinkList';
import * as Image from 'src/components/image/Image';
import * as HeroBanner from 'src/components/hero-banner/HeroBanner';
import * as HeaderExtended from 'src/components/header-extended/HeaderExtended';
import * as Footer from 'src/components/footer/Footer';
import * as Features from 'src/components/features/Features';
import * as DoctorsListing from 'src/components/doctors-listing/DoctorsListing';
import * as DoctorDetails from 'src/components/doctor-details/DoctorDetails';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['ThemeSwitcher', { ...ThemeSwitcher }],
  ['ThemeEditor', { ...ThemeEditor }],
  ['SocialFollow', { ...SocialFollow }],
  ['SectionWrapper', { ...SectionWrapper }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Reviews', { ...Reviews }],
  ['Promo', { ...Promo }],
  ['PageContent', { ...PageContent }],
  ['Navigation', { ...Navigation }],
  ['LinkList', { ...LinkList }],
  ['Image', { ...Image }],
  ['HeroBanner', { ...HeroBanner }],
  ['HeaderExtended', { ...HeaderExtended }],
  ['Footer', { ...Footer }],
  ['Features', { ...Features }],
  ['DoctorsListing', { ...DoctorsListing }],
  ['DoctorDetails', { ...DoctorDetails }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
]);

export default componentMap;
