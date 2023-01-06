import { db } from "@db";
import type { Image } from "@types";

export const ImagesCollection = db.collection<Omit<Image, "_id">>("images");
