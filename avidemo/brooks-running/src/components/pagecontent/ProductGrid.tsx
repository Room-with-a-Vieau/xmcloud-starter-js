'use client';

import { JSX, useMemo, useState } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  RichTextField,
  Text,
  RichText,
  Link,
  NextImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';

type JsonField<T> = { jsonValue?: T } | null | undefined;

interface GridChild {
  id: string;
  template?: { name?: string };
  productName?: JsonField<Field<string>>;
  image?: JsonField<ImageField>;
  priceText?: JsonField<Field<string>>;
  priceValue?: JsonField<Field<string | number>>;
  badge?: JsonField<Field<string>>;
  gender?: JsonField<Field<string>>;
  activity?: JsonField<Field<string>>;
  sizes?: JsonField<Field<string>>;
  link?: JsonField<LinkField>;
  promoTitle?: JsonField<Field<string>>;
  promoText?: JsonField<RichTextField>;
  promoLink?: JsonField<LinkField>;
  promoLink2?: JsonField<LinkField>;
  promoImage?: JsonField<ImageField>;
  isDark?: JsonField<Field<boolean | string>>;
}

interface ProductGridDatasource {
  title?: JsonField<Field<string>>;
  intro?: JsonField<RichTextField>;
  calloutText?: JsonField<Field<string>>;
  calloutLink?: JsonField<LinkField>;
  children?: { results?: GridChild[] };
}

export type ProductGridProps = {
  params: { [key: string]: string };
  fields?: { data?: { datasource?: ProductGridDatasource | null } };
};

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

const INITIAL_PRODUCT_COUNT = 12;
const GENDERS = ['Women', 'Men', 'Unisex'];
const SORT_LABELS: Record<SortOption, string> = {
  featured: 'Featured',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  name: 'Name',
};

const isPromo = (child: GridChild) => child.template?.name === 'Product Grid Promo';
const textOf = (field: JsonField<Field<unknown>>) => String(field?.jsonValue?.value ?? '').trim();
const priceOf = (child: GridChild) => parseFloat(textOf(child.priceValue)) || 0;
const sizesOf = (child: GridChild) =>
  textOf(child.sizes)
    .split(',')
    .map((size) => size.trim())
    .filter(Boolean);
const isChecked = (field: JsonField<Field<boolean | string>>) => {
  const value = field?.jsonValue?.value;
  return value === true || value === '1' || value === 'true';
};

const ProductCard = ({ product }: { product: GridChild }): JSX.Element => {
  const badge = textOf(product.badge);
  const meta = [textOf(product.gender), textOf(product.activity)].filter(Boolean).join(' - ');
  const href = product.link?.jsonValue?.value?.href;

  return (
    <article className="product-card">
      <div className="product-card-badge">{badge && <span>{badge}</span>}</div>
      <a className="product-card-image" href={href || undefined} tabIndex={-1} aria-hidden="true">
        <NextImage field={product.image?.jsonValue} width={400} height={400} />
      </a>
      <h3 className="product-card-name">
        {href ? (
          <a href={href}>
            <Text field={product.productName?.jsonValue} />
          </a>
        ) : (
          <Text field={product.productName?.jsonValue} />
        )}
      </h3>
      <p className="product-card-price">
        <Text field={product.priceText?.jsonValue} />
      </p>
      {meta && <p className="product-card-meta">{meta}</p>}
    </article>
  );
};

const PromoTile = ({ promo }: { promo: GridChild }): JSX.Element => (
  <article className={`product-grid-promo ${isChecked(promo.isDark) ? 'is-dark' : ''}`}>
    {promo.promoImage?.jsonValue?.value?.src && (
      <NextImage
        field={promo.promoImage.jsonValue}
        className="product-grid-promo-image"
        width={900}
        height={600}
      />
    )}
    <div className="product-grid-promo-content">
      <h2>
        <Text field={promo.promoTitle?.jsonValue} />
      </h2>
      <RichText field={promo.promoText?.jsonValue} className="product-grid-promo-text" />
      <div className="product-grid-promo-links">
        <Link field={promo.promoLink?.jsonValue ?? { value: {} }} />
        <Link field={promo.promoLink2?.jsonValue ?? { value: {} }} />
      </div>
    </div>
  </article>
);

export const Default = (props: ProductGridProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  const [genders, setGenders] = useState<string[]>([]);
  const [size, setSize] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('featured');
  const [showAll, setShowAll] = useState(false);

  const datasource = props.fields?.data?.datasource;
  const children = useMemo(() => datasource?.children?.results ?? [], [datasource]);
  const products = useMemo(() => children.filter((child) => !isPromo(child)), [children]);

  const allSizes = useMemo(
    () =>
      Array.from(new Set(products.flatMap(sizesOf))).sort(
        (a, b) => parseFloat(a) - parseFloat(b)
      ),
    [products]
  );

  const isFiltered = genders.length > 0 || size !== null || sort !== 'featured';

  const matchingProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        (genders.length === 0 || genders.includes(textOf(product.gender))) &&
        (size === null || sizesOf(product).includes(size))
    );
    if (sort === 'price-asc') return [...filtered].sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === 'price-desc') return [...filtered].sort((a, b) => priceOf(b) - priceOf(a));
    if (sort === 'name') {
      return [...filtered].sort((a, b) => textOf(a.productName).localeCompare(textOf(b.productName)));
    }
    return filtered;
  }, [products, genders, size, sort]);

  if (!datasource) {
    return (
      <div className={`component product-grid ${sxaStyles}`} id={id || undefined}>
        <div className="container">Product Grid: no datasource selected.</div>
      </div>
    );
  }

  // Featured order with no filters keeps promos in their authored positions; otherwise products only.
  const limit = isPageEditing || showAll ? Infinity : INITIAL_PRODUCT_COUNT;
  const tiles: GridChild[] = [];
  let productCount = 0;
  for (const child of isPageEditing || !isFiltered ? children : matchingProducts) {
    if (isPromo(child)) {
      if (productCount < limit) tiles.push(child);
      continue;
    }
    if (productCount >= limit) break;
    tiles.push(child);
    productCount++;
  }
  const hasMore = !isPageEditing && !showAll && matchingProducts.length > INITIAL_PRODUCT_COUNT;

  const toggleGender = (gender: string) => {
    setGenders((current) =>
      current.includes(gender) ? current.filter((g) => g !== gender) : [...current, gender]
    );
  };

  return (
    <section className={`component product-grid ${sxaStyles}`} id={id || undefined}>
      <div className="container product-grid-layout">
        <aside className="product-grid-sidebar">
          <h1 className="product-grid-title">
            <Text field={datasource.title?.jsonValue} />
          </h1>
          <RichText field={datasource.intro?.jsonValue} className="product-grid-intro" />
          {(isPageEditing || textOf(datasource.calloutText)) && (
            <div className="product-grid-callout">
              <Text tag="p" field={datasource.calloutText?.jsonValue} />
              <Link field={datasource.calloutLink?.jsonValue ?? { value: {} }} />
            </div>
          )}

          <p className="product-grid-filter-label">Filter by:</p>
          <fieldset className="product-grid-filter">
            <legend>Product gender</legend>
            {GENDERS.map((gender) => (
              <label key={gender}>
                <input
                  type="checkbox"
                  checked={genders.includes(gender)}
                  onChange={() => toggleGender(gender)}
                />
                {gender}
              </label>
            ))}
          </fieldset>
          {allSizes.length > 0 && (
            <fieldset className="product-grid-filter">
              <legend>Shoe size</legend>
              <div className="product-grid-sizes">
                {allSizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={size === option}
                    className={size === option ? 'is-selected' : ''}
                    onClick={() => setSize(size === option ? null : option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        </aside>

        <div className="product-grid-main">
          <div className="product-grid-toolbar">
            <span>{matchingProducts.length} products</span>
            <label>
              <span className="visually-hidden">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}>
                {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                  <option key={option} value={option}>
                    {SORT_LABELS[option]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {matchingProducts.length === 0 && !isPageEditing ? (
            <p className="product-grid-empty">No products match these filters.</p>
          ) : (
            <div className="product-grid-cards">
              {tiles.map((child) =>
                isPromo(child) ? (
                  <PromoTile key={child.id} promo={child} />
                ) : (
                  <ProductCard key={child.id} product={child} />
                )
              )}
            </div>
          )}

          {hasMore && (
            <div className="product-grid-more">
              <button type="button" onClick={() => setShowAll(true)}>
                Load all
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
