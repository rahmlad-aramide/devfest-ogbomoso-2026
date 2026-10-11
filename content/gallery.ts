import downloadedPhotos from "./gallery-photos.json";
import { throwback, type Photo } from "./past-editions";

export interface GalleryEdition {
  year: number;
  photos: Photo[];
}

/** Local album selections. Replace the catalog to change photos without touching the UI. */
export const galleryEditions: GalleryEdition[] = [2019, 2021, 2022, 2023, 2024, 2025].map((year) => ({
  year,
  photos: year === 2024 ? throwback.photos : downloadedPhotos
    .filter((photo) => photo.year === year)
    .slice(0, 30)
    .map((photo) => ({
      src: photo.src,
      width: photo.width,
      height: photo.height,
      alt: photo.alt,
      caption: photo.caption,
    })),
}));
