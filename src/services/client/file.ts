import type { ObjectId } from "mongodb";

export function imagePath(imageId: ObjectId | string | undefined) {
  if (imageId === undefined) imageId = "default.jpg";
  return "/upload/" + imageId;
}
