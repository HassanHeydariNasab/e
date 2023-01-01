import { db } from "@db";
import type { Image } from "@types";

export const ImagesCollection = db.collection<Image>("images");
