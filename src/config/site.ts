type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

type Theme = 'light' | 'dark' | 'system';

type SocialPlatform = 'facebook' | 'x' | 'instagram' | 'linkedin' | 'github';

interface SiteConfig {
  title: string;
  description: string;
  lang: string;
  defaultTheme: Theme;
  languages: LanguageConfig[];
  version: string;
}

interface LogoConfig {
  src: string;
  alt: string;
}

interface NavigationItem {
  label: string;
  href: string;
}

interface LanguageConfig {
  code: string;
  label: string;
}

interface ToolsConfig {
  themeToggle: boolean;
  languageToggle: boolean;
}

interface LayoutConfig {
  maxWidth: string;
  fullWidth: boolean;
}

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterConfig {
  brand: {
    showLogo: boolean;
    showVersion: boolean;
    description?: string;
  };
  links: FooterLink[];
  contact: {
    email?: string;
    socialLinks: SocialLink[];
  };
}

interface HeaderConfig {
  sticky: boolean;
  transparent: boolean;
  blurred: boolean;
  bordered: boolean;
  shadow: ShadowSize;
  logo: LogoConfig;
  navigation: NavigationItem[];
  tools: ToolsConfig;
}

interface Config {
  site: SiteConfig;
  layout: LayoutConfig;
  header: HeaderConfig;
  footer: FooterConfig;
}

const config: Config = {
  site: {
    title: 'edc-template',
    description: 'Astro 5 + Tailwind CSS v4 + TypeScript',
    lang: 'en',
    defaultTheme: 'system',
    languages: [
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Español' },
    ],
    version: '0.0.1',
  },
  layout: {
    maxWidth: 'max-w-7xl',
    fullWidth: false,
  },
  header: {
    sticky: false,
    transparent: false,
    blurred: true,
    bordered: false,
    shadow: 'none',
    logo: {
      src: '/logo.svg',
      alt: 'edc-template logo',
    },
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Blog', href: '/blog' },
      { label: 'Projects', href: '/projects' },
      { label: 'Contact', href: '/contact' },
    ],
    tools: {
      themeToggle: true,
      languageToggle: true,
    },
  },
  footer: {
    brand: {
      showLogo: true,
      showVersion: true,
      description: 'A modern Astro 5 template with Tailwind CSS v4 and TypeScript.',
    },
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
    contact: {
      email: 'hello@example.com',
      socialLinks: [
        { platform: 'github', url: 'https://github.com/edcilo' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/edcilo' },
        { platform: 'x', url: 'https://x.com/edcilo' },
        { platform: 'instagram', url: 'https://instagram.com/edcilo' },
        { platform: 'facebook', url: 'https://facebook.com/edcilo' },
      ],
    },
  },
};

export type {
  Config,
  FooterConfig,
  FooterLink,
  HeaderConfig,
  LanguageConfig,
  LayoutConfig,
  LogoConfig,
  NavigationItem,
  ShadowSize,
  SiteConfig,
  SocialLink,
  SocialPlatform,
  Theme,
  ToolsConfig,
};
export { config };
