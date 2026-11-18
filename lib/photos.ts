/* Photographs from Unsplash, used under the Unsplash License (free to use,
   no permission needed; credit given anyway on /credits). They are served
   from Unsplash's own image CDN, which crops and sizes each one to the box
   it sits in, so the site ships no large photo files of its own. They show
   rural India in general, not the Foundation's own work. */

export type Photo = {
  /** The image's id on images.unsplash.com. */
  id: string;
  alt: string;
  by: string;
  /** The photographer's Unsplash username. */
  user: string;
  /** The photo's page on Unsplash. */
  page: string;
};

const unsplash = (path: string) => `https://unsplash.com/${path}`;

/** A cropped, sized URL for a photo. */
export function photoSrc(p: Photo, w: number, h: number) {
  return `https://images.unsplash.com/${p.id}?auto=format&fit=crop&crop=entropy&q=70&w=${w}&h=${h}`;
}

/** A srcset of the same crop at several widths. */
export function photoSrcSet(p: Photo, w: number, h: number) {
  return [0.5, 1, 1.5, 2]
    .map((k) => `${photoSrc(p, Math.round(w * k), Math.round(h * k))} ${Math.round(w * k)}w`)
    .join(", ");
}

export const HERO_PHOTO: Photo = {
  id: "photo-1758390286286-9b3b690989e7",
  alt: "People walking along a dirt path between rows of tea bushes and shade trees.",
  by: "Rohit Dey",
  user: "rohit16dey",
  page: unsplash("photos/ROuCX01G3Pg"),
};

export const PROGRAMME_PHOTOS: Record<string, Photo> = {
  "sustainable-agriculture": {
    id: "photo-1530507629858-e4977d30e9e0",
    alt: "A woman harvesting rice by hand in a green field.",
    by: "Nandhu Kumar",
    user: "nandhukumarndd",
    page: unsplash("photos/5NGTf4oD8RA"),
  },
  "farmer-producer-company": {
    id: "photo-1609252509229-364936a1d1a2",
    alt: "A group of villagers sitting together on the grass at the edge of a field, meeting in the open.",
    by: "amol sonar",
    user: "amoldhl",
    page: unsplash("photos/1KntWz6Hpgc"),
  },
  "farm-field-school": {
    id: "photo-1528693404014-b13ebe6e723e",
    alt: "A farmer standing in young rice seedlings, leaning on a stick.",
    by: "Nandhu Kumar",
    user: "nandhukumarndd",
    page: unsplash("photos/fg5k00uT0TU"),
  },
  "agro-tourism": {
    id: "photo-1759738103476-9abb3b59458e",
    alt: "Three thatched huts lit up at dusk among trees.",
    by: "Rohit Dey",
    user: "rohit16dey",
    page: unsplash("photos/igl2bAwzdLs"),
  },
  "green-education": {
    id: "photo-1692269725836-fbd72e98883f",
    alt: "Children in school uniform sitting at their desks in a classroom.",
    by: "Swastik Arora",
    user: "swastikarora",
    page: unsplash("photos/nFx5TuNxz64"),
  },
  "gramya-udyog": {
    id: "photo-1739185127141-bb4aa70ad22a",
    alt: "A woman spinning yarn at a wooden spinning wheel.",
    by: "Aman Chaturvedi",
    user: "amanchaturvediii",
    page: unsplash("photos/K84VkqSa3nQ"),
  },
  wellness: {
    id: "photo-1731171060382-0ed37122ad60",
    alt: "A woman sitting cross-legged in meditation on a rock in a stream.",
    by: "Gokul Gurung",
    user: "infinitygraphy",
    page: unsplash("photos/AjWq2EInNV8"),
  },
  "financial-inclusion": {
    id: "photo-1708593337380-6f97a307696f",
    alt: "A group of women sitting together outdoors.",
    by: "EqualStock",
    user: "equalstock",
    page: unsplash("photos/V-3YgB-GsFg"),
  },
  "womens-empowerment": {
    id: "photo-1707721690626-10e5f0366bcb",
    alt: "Women working together among the plants in a field.",
    by: "EqualStock",
    user: "equalstock",
    page: unsplash("photos/0vu32v6BmSg"),
  },
  "youth-empowerment": {
    id: "photo-1533254012848-644c18f39289",
    alt: "Three boys walking down a lane between brightly painted houses.",
    by: "Charu Chaturvedi",
    user: "itscharu",
    page: unsplash("photos/o9CQk3UnGM8"),
  },
  environment: {
    id: "photo-1600150806193-cf869bcfee05",
    alt: "A row of people bending to plant seedlings in a field.",
    by: "Deepak kumar",
    user: "story_from_slowman",
    page: unsplash("photos/b4eRRodrirQ"),
  },
  "waste-to-wealth": {
    id: "photo-1756716518925-8af9e272da86",
    alt: "Vegetable and fruit scraps breaking down in a compost bin.",
    by: "Jasmin Börsig",
    user: "tschasmine",
    page: unsplash("photos/jONyv1K_E28"),
  },
};

export const ALL_PHOTOS: { use: string; photo: Photo }[] = [
  { use: "Home page", photo: HERO_PHOTO },
  ...Object.entries(PROGRAMME_PHOTOS).map(([use, photo]) => ({ use, photo })),
];
