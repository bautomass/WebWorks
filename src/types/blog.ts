// types/blog.ts
export interface BlogPost {
  id: number;
  virsraksts: string;
  slug: string;
  ievads: string;
  saturs: string;
  attels_url: string;
  kategorija_id: number;
  autors_id: number;
  publicets: boolean;
  publicets_datums: string;
  lasijuma_laiks: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  created_at: string;
  updated_at: string;
  kategorija?: {
    nosaukums: string;
    slug: string;
  };
  autors?: {
    vards: string;
    uzvards: string;
    avatar_url: string;
  };
  tags?: Array<{
    nosaukums: string;
    slug: string;
  }>;
}

export interface Category {
  id: number;
  nosaukums: string;
  slug: string;
  apraksts: string;
  created_at: string;
  updated_at: string;
}

export interface BlogAuthor {
  id: number;
  vards: string;
  uzvards: string;
  epasts: string;
  bio: string;
  avatar_url: string;
  created_at: string;
}

export interface BlogTag {
  id: number;
  nosaukums: string;
  slug: string;
  created_at: string;
}
