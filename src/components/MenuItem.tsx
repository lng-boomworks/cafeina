import { withBase } from "../utils/url";
import { allergenLabel } from "../utils/menu";

interface MenuItemProps {
  name: string;
  variant?: string;
  description?: string;
  price?: string;
  image?: string;
  image_alt?: string;
  featured?: boolean;
  /** Allergen codes the item contains (e.g. ["G","M"]). */
  allergens?: string[];
}

export function MenuItem({
  name,
  variant,
  description,
  price,
  image,
  image_alt,
  featured,
  allergens,
}: MenuItemProps) {
  const hasImage = Boolean(image);
  const codes = allergens ?? [];
  return (
    <article
      className={`group flex gap-4 sm:gap-6 items-start py-5 border-b border-border/60 last:border-0 ${
        featured ? "bg-cream/50 -mx-4 sm:-mx-6 px-4 sm:px-6 rounded-2xl" : ""
      }`}
    >
      {hasImage && (
        <div className="shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-teal-pale border border-border/50">
          <img
            src={withBase(image!)}
            alt={image_alt ?? name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-x-3 gap-y-1 mb-0.5 flex-wrap">
          <h4 className="text-lg sm:text-xl font-serif text-teal-deep leading-tight">
            {name}
            {variant && (
              <span className="ml-2 text-[13px] font-sans font-normal not-italic text-text-muted align-middle">
                {variant}
              </span>
            )}
          </h4>
          {featured && (
            <span className="text-[11px] uppercase tracking-wider text-sage font-medium">Featured</span>
          )}
          <span className="flex-1 border-b border-dotted border-border/70 translate-y-[-4px]" aria-hidden="true" />
          {price && <span className="text-base sm:text-lg font-medium text-teal-mid shrink-0">{price}</span>}
        </div>
        {description && (
          <p className="text-[15px] text-text-muted leading-relaxed mt-1">{description}</p>
        )}
        {codes.length > 0 && (
          <ul className="flex flex-wrap items-center gap-1.5 mt-2" aria-label="Contains allergens">
            <li className="text-[10px] uppercase tracking-wide text-text-muted/70 mr-0.5">Contains</li>
            {codes.map((code) => (
              <li
                key={code}
                title={allergenLabel(code)}
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md border border-teal-mid/30 bg-teal-pale/60 text-[10px] font-semibold uppercase text-sage"
              >
                <span aria-hidden="true">{code}</span>
                <span className="sr-only">{allergenLabel(code)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
