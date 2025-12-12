import React from "react";
import { Boxes } from "../../../../components/ui/background-boxes";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { formatDate } from "@/lib/utils";
import Views from "@/components/Views";
import { Suspense } from "react";
import { PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { ProjectTypeCard } from "@/components/ProjectCard";
import { ThreeDCard } from "@/components/ThreeDCard";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPost }] = await Promise.all([
    client.fetch(PROJECT_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);
  const {
    _createdAt,
    _id,
    title,
    description,
    image,
    category,
    author,
    details,
  } = post;

  const formatedate = formatDate(_createdAt);
  const md = markdownit();
  const parsedContent = md.render(details || "");

  if (!post) return notFound();
  return (
    <>
      <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <p className="tag tag-tri relative">{formatedate}</p>
        <h1 className="heading relative">{title}</h1>
        <p className="sub-heading relative max-w-5xl text-center line-clamp-3">
          {description}
        </p>
      </div>
      <section className="section_container">
        <Image
          src={image}
          width={200}
          height={200}
          alt="image"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-5xl mx-auto">
          <div className="flex justify-between gap-5">
            <Link href={"/"} className="flex gap-2 mb-3 items-center">
              <Image
                src={author.image}
                alt=""
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg border-2"
              />
              <div>
                <p className="text-3xl">{author?.name}</p>
                <p className="text-2xl">@{author?.username}</p>
              </div>
            </Link>
            <p className="category_tag">{category}</p>
          </div>
          <h3 className="text-3xl font-bold">PROJECT DETAILS</h3>
          {parsedContent ? (
            <article
              className="prose prose-lg max-w-full"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No Details Provided</p>
          )}
        </div>
        <hr className="divider" />
        {editorPost?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl font-semibold">Editor Picks</p>
            <ul className="card_grid-sm mt-7">
              {editorPost.map((project: ProjectTypeCard, index: number) => (
                <li key={project._id}>
                  <ThreeDCard post={project} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<></>}>
          {/* iam using suspense here because views is fetching from the server directly as it was updating in real time so to not slow the page i added it and other data comes from the cache and it loads faster compare to this */}
          <Views id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
