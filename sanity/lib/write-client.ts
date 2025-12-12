// /sanity/lib/write-client.server.ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// Safety check
if (!token) {
  throw new Error("SANITY_WRITE_CLIENT token not found in env");
}
