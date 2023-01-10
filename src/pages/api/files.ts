import { promises as fs } from "fs";
import path from "path";

import type { NextApiHandler } from "next";
import { File, Formidable } from "formidable";
import { ImagesCollection } from "@models";

type ProcessedFiles = Array<[string, File]>;

export const config = {
  api: {
    bodyParser: false,
  },
};

const fileUpload: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const files = await new Promise<ProcessedFiles | undefined>(
      (resolve, reject) => {
        const form = new Formidable();
        const files: ProcessedFiles = [];
        form.on("file", function (field, file) {
          files.push([field, file]);
        });
        form.on("end", () => resolve(files));
        form.on("error", (err) => reject(err));
        form.parse(req, () => {
          //
        });
      }
    ).catch((e) => {
      console.log(e);
    });

    if (files?.length) {
      const targetPath = path.join(process.cwd(), "src", "public", "upload");
      try {
        await fs.access(targetPath);
      } catch (e) {
        await fs.mkdir(targetPath);
      }

      for (const file of files) {
        const tempPath = file[1].filepath;
        const { insertedId } = await ImagesCollection.insertOne({
          name: file[1].originalFilename,
        });
        await fs.copyFile(
          tempPath,
          path.join(targetPath, insertedId.toHexString())
        );
        res.status(201).json({ _id: insertedId });
        return;
      }
    }
    res.status(500).json(null);
  } else {
    res.status(405).json(null);
  }
};

export default fileUpload;
