"use server";
import { auth } from "@/app/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createProject = async <T>(
  state: T,
  form: FormData,
  details: string
) => {
  const session = await auth();
  

  if (!session)
    return parseServerActionResponse({
      error: "Unauthorized",
      status: "error",
    });

  const { title, description, category, imageurl } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "details")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const project = {
      title,
      description,
      category,
      image: imageurl,
      details,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session.user?.id,
      },
    };

    const result = await writeClient.create({
      _type: "project",
      ...project,
    });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "success",
    });

  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "error",
    });
  }
};
