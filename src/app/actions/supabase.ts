// src/actions/getGallery.ts
import { PortfolioItem, ProjectItem } from "../types";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACK_END_URL ?? "http://localhost:8000";

export async function getGallery(): Promise<PortfolioItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/gallery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "no-store" // uncomment in Next.js if you want fresh data each time
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch gallery: ${res.status}`);
    }

    const data = await res.json();

    // Map API result to your GalleryItem interface and reformat paths
    return data.map(
      (item: any): PortfolioItem => ({
        id: item.id,
        title: item.title,
        description: item.description ?? null,
        date: item.date ? new Date(item.date) : null,
        category: item.category ?? "uncategorized",
        client: item.client ?? null,
        client_account: item.client_account ?? null,
        thumbnail: `${BASE_URL}/portfolio/${item.thumbnail}`,
        hd_image: `${BASE_URL}/portfolio/${item.hd_image}`,
        timelapse_gif: item.timelapse_gif
          ? `${BASE_URL}/portfolio/${item.timelapse_gif}`
          : null,
        timelapse_url: item.timelapse_url ?? null, // external link (YouTube, etc.)
        psd_file: item.psd_file
          ? `${BASE_URL}/portfolio/${item.psd_file}`
          : null,
        created_at: item.created_at ? new Date(item.created_at) : undefined,
      })
    );
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}
export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "no-store" // uncomment in Next.js if you want fresh data each time
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }

    const data = await res.json();

    // Map API result to your ProjectItem interface
    return data.projects.map(
      (item: any): ProjectItem => ({
        id: String(item.id), // Supabase usually gives number → convert to string
        title: item.title,
        status: item.status,
        category: item.category,
        summary: item.summary,
        release_date_option: item.release_date_option,
        release_date: item.release_date ? new Date(item.release_date) : null,
        progress: item.progress,
        created_at: item.created_at ? new Date(item.created_at) : undefined,
        updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
        hd_image: item.hd_image
          ? `${BASE_URL}/projects-draft/${item.hd_image}`
          : null,
        thumbnail: item.thumbnail
          ? `${BASE_URL}/projects-draft/${item.thumbnail}`
          : null,
      })
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
