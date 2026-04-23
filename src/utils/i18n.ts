export type Locale = 'en' | 'es';

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALES: Locale[] = ['en', 'es'];

export const UI_STRINGS: Record<Locale, Record<string, string>> = {
  en: {
    home: 'Home',
    menu: 'Menu',
    about: 'About',
    team: 'Team',
    events: 'Events',
    gallery: 'Gallery',
    journal: 'Journal',
    contact: 'Contact',
    book_table: 'Book a table',
    open_every_day: 'Open every day · till late',
    cocktails: 'Cocktails',
    spirits: 'Spirits',
    'wine-beer': 'Wine & Beer',
    beverages: 'Beverages',
    'cakes-snacks': 'Cakes & Snacks',
    our: 'our',
    made_with: 'freshly made with the best ingredients',
    see_menu: 'See the menu',
  },
  es: {
    home: 'Inicio',
    menu: 'Carta',
    about: 'Nosotros',
    team: 'Equipo',
    events: 'Eventos',
    gallery: 'Galería',
    journal: 'Diario',
    contact: 'Contacto',
    book_table: 'Reservar mesa',
    open_every_day: 'Abierto todos los días 9h – tarde',
    cocktails: 'Cócteles',
    spirits: 'Licores',
    'wine-beer': 'Vino y Cerveza',
    beverages: 'Bebidas',
    'cakes-snacks': 'Pasteles y Aperitivos',
    our: 'nuestros',
    made_with: 'elaborados con los mejores ingredientes',
    see_menu: 'Ver la carta',
  },
};

export function t(locale: Locale | undefined, key: string): string {
  const loc = locale ?? DEFAULT_LOCALE;
  return UI_STRINGS[loc]?.[key] ?? UI_STRINGS[DEFAULT_LOCALE][key] ?? key;
}

export function localePath(locale: Locale | undefined, path: string): string {
  const loc = locale ?? DEFAULT_LOCALE;
  if (loc === DEFAULT_LOCALE) return path;
  if (!path.startsWith('/')) return path;
  return `/${loc}${path === '/' ? '' : path}`;
}
