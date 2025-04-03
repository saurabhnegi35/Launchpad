// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import "server-only";
import { defineLive } from "next-sanity";
import { client } from "./client";

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

if (!apiVersion) {
  throw new Error("NEXT_PUBLIC_SANITY_API_VERSION is not defined");
}

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Live content is currently only available on the experimental API
    // https://www.sanity.io/docs/api-versioning
    apiVersion: apiVersion,
  }),
});
