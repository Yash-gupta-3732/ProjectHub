import React, { Suspense } from "react";
import { Boxes } from "../../components/ui/background-boxes";
import { cn } from "@/lib/utils";
import SearchForm from "@/components/SearchForm";
import { ThreeDCard } from "@/components/ThreeDCard";
import { auth } from "../auth";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { PROJECT_QUERY } from "../../sanity/lib/queries";
import { ProjectTypeCard } from "@/components/ProjectCard";
import ProjectListSkeleton from "@/components/ProjectListSkeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = await searchParams;
  const params = { search: query?.query || null };
  const session = await auth();
  const { data: posts } = await sanityFetch({ query: PROJECT_QUERY, params });
  return (
    <>
      <div className="h-[530px] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <h1
          className={cn(
            "md:text-4xl text-xl font-extrabold text-white relative z-20 heading"
          )}
        >
          WELCOME TO PROJECTHUB
        </h1>
        <p className="text-center mt-2 text-neutral-300 relative z-20 mb-4 sub-heading">
          Framer motion is the best animation library ngl
        </p>

        <SearchForm query={query.query} />
      </div>
      <section className="section_container">
        <p className="text-30-semibold">
          {query.query
            ? `Search Result for "${query.query}"`
            : `Trendy Project`}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 justify-center gap-1 ">
          <Suspense fallback={<ProjectListSkeleton length = {posts.length} />}>
            {posts?.length > 0 ? (
              posts.map((project: ProjectTypeCard, index: number) => (
                <li key={project._id}>
                  <ThreeDCard post={project} />
                </li>
              ))
            ) : (
              <p className="no-result">No projects found.</p>
            )}
          </Suspense>
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
