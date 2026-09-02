import {
  ComponentParams,
  ComponentRendering,
  NextjsContentSdkComponent,
  Page,
} from '@sitecore-content-sdk/nextjs';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams & {
    /**
     * The identifier for the rendering
     */
    RenderingIdentifier?: string;
    /**
     * The styles for the rendering
     * This value is calculated by the Placeholder component
     */
    styles?: string;
    /**
     * The enabled placeholders for the rendering
     */
    EnabledPlaceholders?: string;
  };
  page: Page;
};

/**
 * Component props with context
 * You can access `page` by withSitecore/useSitecore
 * @example withSitecore()(ContentBlock)
 * @example const { page } = useSitecore()
 */
export type ComponentWithContextProps = ComponentProps & {
  page: Page;
};

/**
 * Component props where `componentMap` is required, used by components
 * that render nested placeholders (e.g. containers, flex).
 */
export type PlaceholderComponentProps = ComponentProps & {
  componentMap: Map<string, NextjsContentSdkComponent>;
};

/**
 * Component props where `componentMap` is optional, used by leaf
 * components that never render a placeholder of their own.
 */
export type OptionalComponentProps = ComponentProps & {
  componentMap?: Map<string, NextjsContentSdkComponent>;
};

/**
 * Reads a datasource that may arrive either as a plain object or wrapped
 * in the GraphQL `{ data: { datasource } }` shape.
 */
export const getDatasource = <T>(
  fields: { data?: { datasource?: T; contextItem?: T } } | T | null | undefined
): T | undefined => {
  if (!fields) return undefined;
  const graphFields = fields as { data?: { datasource?: T; contextItem?: T } };
  return graphFields?.data?.datasource ?? graphFields?.data?.contextItem ?? (fields as T);
};

/**
 * Reads a field that may arrive either as a plain field value or wrapped
 * in the GraphQL `{ jsonValue }` shape.
 */
export const getFieldValue = <T>(
  field: { jsonValue?: T } | T | null | undefined
): T | undefined => {
  if (!field) return undefined;
  const value = field as { jsonValue?: T };
  return value?.jsonValue !== undefined ? value.jsonValue : (field as T);
};
