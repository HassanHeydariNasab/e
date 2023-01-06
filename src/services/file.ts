import { ObjectId } from "mongodb";

export function imagePath(imageId: ObjectId | string) {
  return "/upload/" + imageId;
}
