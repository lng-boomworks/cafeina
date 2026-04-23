import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const LOCALES = ['en', 'es'] as const;
const MENU_CATEGORIES = ['cocktails', 'spirits', 'wine-beer', 'beverages', 'cakes-snacks'] as const;

const offering = z.object({
  title: z.string(),
  body: z.string(),
  image: z.string().optional(),
  image_alt: z.string().optional(),
});

const featuredProduct = z.object({
  label: z.string().optional(),
  heading: z.string(),
  subheading: z.string().optional(),
  body: z.string(),
  image: z.string().optional(),
  image_alt: z.string().optional(),
  cta_text: z.string().optional(),
  cta_url: z.string().optional(),
});

const value = z.object({
  title: z.string(),
  body: z.string(),
  icon: z.string().optional(),
});

const menuCategoryCard = z.object({
  title: z.string(),
  slug: z.enum(MENU_CATEGORIES),
  description: z.string().optional(),
  image: z.string().optional(),
  image_alt: z.string().optional(),
});

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const faqCategory = z.object({
  category: z.string(),
  items: z.array(faqItem),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    locale: z.enum(LOCALES).default('en'),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),

    // Hero
    hero_label: z.string().optional(),
    hero_heading: z.string().optional(),
    hero_subheading: z.string().optional(),
    hero_image: z.string().optional(),
    hero_image_alt: z.string().optional(),
    hero_button_text: z.string().optional(),
    hero_button_url: z.string().optional(),
    hero_cta_text: z.string().optional(),
    hero_cta_url: z.string().optional(),

    // Home: welcome band + offerings + featured
    welcome_heading: z.string().optional(),
    welcome_subheading: z.string().optional(),
    welcome_body: z.string().optional(),
    loyalty_text: z.string().optional(),
    loyalty_cta_text: z.string().optional(),
    loyalty_cta_url: z.string().optional(),
    offerings: z.array(offering).optional(),
    featured_product: featuredProduct.optional(),

    // About: story + values
    story_heading: z.string().optional(),
    story_subheading: z.string().optional(),
    story_body: z.string().optional(),
    story_image: z.string().optional(),
    story_image_alt: z.string().optional(),
    values: z.array(value).optional(),

    // About: "our space" landscape banner
    space_heading: z.string().optional(),
    space_body: z.string().optional(),
    space_image: z.string().optional(),
    space_image_alt: z.string().optional(),

    // Home: FinalCTA landscape background
    final_cta_image: z.string().optional(),
    final_cta_image_alt: z.string().optional(),

    // Home: interior landscape band (between hero and offerings)
    interior_image: z.string().optional(),
    interior_image_alt: z.string().optional(),
    interior_heading: z.string().optional(),
    interior_subheading: z.string().optional(),

    // Generic landscape hero (team, menu landing, gallery)
    hero_landscape_image: z.string().optional(),
    hero_landscape_image_alt: z.string().optional(),

    // Blog / intro panel background
    intro_image: z.string().optional(),
    intro_image_alt: z.string().optional(),

    // Menu landing
    menu_categories: z.array(menuCategoryCard).optional(),

    // Shared
    intro_heading: z.string().optional(),
    intro_body: z.string().optional(),
    cta_heading: z.string().optional(),
    cta_text: z.string().optional(),

    // Contact-specific
    email: z.string().optional(),
    phone: z.string().optional(),
    phone_display: z.string().optional(),
    address: z.string().optional(),
    hours: z.string().optional(),
    map_embed_url: z.string().optional(),
    social_facebook: z.string().optional(),
    social_instagram: z.string().optional(),
    calendly_url: z.string().optional(),

    // FAQ
    faq_categories: z.array(faqCategory).optional(),

    // Legacy/deprecated (kept for backwards compat with existing md files)
    hero_stat_1_number: z.string().optional(),
    hero_stat_1_label: z.string().optional(),
    hero_stat_2_number: z.string().optional(),
    hero_stat_2_label: z.string().optional(),
    hero_quote: z.string().optional(),
    hero_quote_author: z.string().optional(),
    hero_quote_role: z.string().optional(),
    kate_heading: z.string().optional(),
    kate_bio: z.string().optional(),
    kate_quote: z.string().optional(),
  }),
});

const menuItems = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/menuItems' }),
  schema: z.object({
    category: z.enum(MENU_CATEGORIES),
    subcategory: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    price: z.string().optional(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    order: z.number().default(100),
    locale: z.enum(LOCALES).default('en'),
    featured: z.boolean().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    body: z.string(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    cta_text: z.string().optional(),
    cta_url: z.string().optional(),
    order: z.number().default(100),
    locale: z.enum(LOCALES).default('en'),
  }),
});

const teamMembers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teamMembers' }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    bio: z.string(),
    photo: z.string().optional(),
    photo_alt: z.string().optional(),
    order: z.number().default(100),
    locale: z.enum(LOCALES).default('en'),
    placeholder: z.boolean().optional(),
  }),
});

const galleryImages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/galleryImages' }),
  schema: z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
    category: z.string().optional(),
    order: z.number().default(100),
    locale: z.enum(LOCALES).default('en'),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    order: z.number().default(100),
    locale: z.enum(LOCALES).default('en'),
  }),
});

export const collections = { pages, menuItems, events, teamMembers, galleryImages, testimonials };
