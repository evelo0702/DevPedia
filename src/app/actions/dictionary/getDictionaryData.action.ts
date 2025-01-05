"use server";

import { transformData, transformObjectId } from "@/app/utils/changeStringId";
import { connectDB } from "@/app/utils/database";
import { ObjectId } from "mongodb";

export async function getDictionaryData() {
  try {
    const db = (await connectDB).db("DevPedia");
    const result = await db
      .collection("dictionary")
      .find({}, { projection: { code: 0, content: 0 } })
      .toArray();
    return transformData(result);
  } catch (error) {
    console.error("Error fetching dictionary data:", error);
    throw new Error("Failed to fetch dictionary data");
  }
}

export async function getDictionaryDataById(id: string) {
  try {
    const db = (await connectDB).db("DevPedia");
    const objectId = new ObjectId(id);
    const result = await db.collection("dictionary").findOne({ _id: objectId });
    return transformObjectId(result);
  } catch (error) {
    console.error("Error fetching dictionary data:", error);
    throw new Error("Failed to fetch dictionary data");
  }
}
