import { withBase } from "../utils/url";

interface MenuItemProps {
  name: string;
  description?: string;
  price?: string;
  image?: string;
  image_alt?: string;
  featured?: boolean;
}

export function MenuItem({ name, description, price, image, image_alt, featured }: MenuItemProps) {
  const hasImage = Boolean(image);
  return (
    <article
      className={`group flex gap-4 sm:gap-6 items-start py-6 border-b border-border/60 last:border-0 ${
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
        <div className="flex items-baseline gap-3 mb-1 flex-wrap">
          <h4 className="text-lg sm:text-xl font-serif text-teal-deep leading-tight">{name}</h4>
          {featured && (
            <span className="text-[11px] uppercase tracking-wider text-sage font-medium">Featured</span>
          )}
          <span className="flex-1 border-b border-dotted border-border/70 translate-y-[-4px]" aria-hidden="true" />
          {price && <span className="text-base sm:text-lg font-medium text-teal-mid shrink-0">{price}</span>}
        </div>
        {description && (
          <p className="text-[15px] text-text-muted leading-relaxed mt-1">{description}</p>
        )}
      </div>
    </article>
  );
}
