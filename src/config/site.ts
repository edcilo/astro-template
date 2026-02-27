type ShadowSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

type Theme = 'light' | 'dark' | 'system';

interface SiteConfig {
  title: string;
  description: string;
  lang: string;
  defaultTheme: Theme;
  languages: LanguageConfig[];
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

interface HeaderConfig {
  sticky: boolean;
  fullWidth: boolean;
  maxWidth: string;
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
  header: HeaderConfig;
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
  },
  header: {
    sticky: false,
    fullWidth: false,
    maxWidth: 'max-w-7xl',
    transparent: false,
    blurred: true,
    bordered: false,
    shadow: 'none',
    logo: {
      src: '/logo.svg',
      alt: 'edc-template logo',
    },
    navigation: [],
    tools: {
      themeToggle: true,
      languageToggle: true,
    },
  },
};

export type {
  Config,
  HeaderConfig,
  LanguageConfig,
  LogoConfig,
  NavigationItem,
  ShadowSize,
  SiteConfig,
  Theme,
  ToolsConfig,
};
export { config };
