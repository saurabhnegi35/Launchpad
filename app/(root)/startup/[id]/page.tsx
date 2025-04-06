import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUPS_BY_ID_QUERY,
} from "@/sanity/lib/query";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
export const experimental_ppr = true;

const md = markdownit();
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  //Parallel Data fetching
  const [post, playlist] = await Promise.all([
    client.fetch(STARTUPS_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editors-pick",
    }),
  ]);

  // Sequential Data Fetching
  // const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id });

  // const playlist = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
  //   slug: "editors-pick",
  // });

  const editorPosts = playlist?.select ?? [];

  if (!post) return notFound();

  const parsedPitchContent = md.render(post?.pitch || "");

  //   console.log(editorPosts);

  return (
    <>
      <section className="pattern blue_container">
        <p className="tag tag-tri font-work-sans">
          {formatDate(post?._createdAt)}
        </p>
        <h1 className="heading">{post?.title} </h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post?.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-gray-500">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post?.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedPitchContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedPitchContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider mt-5" />

        {/*TODO: EDITOR SELECTED STARTUPS */}
        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10">
            <p className="text-30-semibold ">Editor Picks</p>
            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
