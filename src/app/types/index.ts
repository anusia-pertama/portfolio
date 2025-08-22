// types/menu.ts

export type StringsMenu = {
  website: {
    title: string;
    description: string;
    email: string;
  };
  navbar: {
    logo: {
      teks: string;
      href: string;
      img?: string;
    };
    links: { text: string; href: string }[];
  };
  hero: {
    title: string;
    components: {
      background: {
        md: {
          image: string;
          imageDark: string;
          position: string;
          size: string;
        };
        sm: {
          image: string;
          imageDark: string;
          position: string;
          size: string;
        };
      };
      tagline?: string;
      title?: string;
      description?: string;
      buttons: { text: string; href: string }[];
    };
  };
  portfolio: {
    title: string;
    category: string[];
    description: string;
    buttons: { text: string; href: string; target?: string }[];
    localFiles: LocalPortfolioItem[];
  };
  projects?: {
    title: string;
    category: string[];
    description: string;
    buttons: { text: string; href: string; target?: string }[];
    localFiles: LocalProjectItem[];
  };
  commission: {
    title: string;
    description: string;
    buttons: { text: string; href: string }[];
    tiers: {
      title: string;
      price: string;
      description: string;
      sample: string;
    }[];
  };
  footer: {
    title: string;
    copyright: string;
    links: { text: string; href: string }[];
  };
};

export type LocalPortfolioItem = {
  title: string;
  description: string;
  image: string;
  category: "Personal" | "Fan Art" | "Commission" | "Collaboration"; // explicit union since you filter on these
  timelapse_gif?: string | null;
  timelapse_url?: string | null;
  psd_file?: string | null;
  client?: string | null;
  client_account?: string | null;
  date?: Date | null; // 👈 add this
};
export interface LocalProjectItem {
  title: string;
  status: ProjectStatus;
  category: ProjectCategory;
  summary: string;
  release_date_option: ReleaseDateOption;
  release_date?: Date | null; // Postgres DATE → ISO string
  progress: string;
  image?: string | null;
}

export interface PortfolioItem {
  id: string; // always returned by Supabase, no need for "?"
  title: string;
  description?: string | null;
  date?: Date | null; // Supabase returns ISO string (e.g. "2025-08-19T12:34:56+00:00")
  thumbnail: string | null;
  hd_image: string;
  timelapse_gif?: string | null;
  timelapse_url?: string | null;
  psd_file?: string | null;
  created_at?: Date | null; // same reason: timestamp → string
  category: "Personal" | "Fan Art" | "Commission" | "Collaboration"; // explicit union since you filter on these
  client?: string | null;
  client_account?: string | null;
}

// Explicit union types for controlled enums from CHECK constraints
export type ProjectCategory =
  | "Anime"
  | "Manga"
  | "Movie"
  | "Game"
  | "undisclosed";
export type ProjectStatus =
  | "undisclosed"
  | "released"
  | "to be announced"
  | "in production";
export type ReleaseDateOption = "undisclosed" | "to be announced" | "date";

// Matches table: projects
export interface ProjectItem {
  id: string; // Supabase always returns string for primary keys
  title: string;
  status: ProjectStatus;
  category: ProjectCategory;
  summary: string;
  release_date_option: ReleaseDateOption;
  release_date?: Date | null; // Postgres DATE → ISO string
  progress: string;
  created_at?: Date | null; // Postgres timestamp → ISO string
  updated_at?: Date | null; // same reason
  hd_image?: string | null;
  thumbnail?: string | null;
}

// Matches table: project_characters
export interface CharacterItem {
  id: string;
  project_id: string; // foreign key to ProjectItem.id
  name: string;
}
