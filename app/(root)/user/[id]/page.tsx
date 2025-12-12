import React, { Suspense } from "react";
import { AnimatedProfileCard } from "@/components/AnimatedProfileCard";
import { auth } from "../../../auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import UserProjects from "@/components/UserProject";
import ProjectListSkeleton from "@/components/ProjectListSkeleton";


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();
 
  return (
    <>
      <div>
        <section className="profile_container">
          <AnimatedProfileCard
            username={user.username}
            imageUrl={user.image}
            name={user.name}
            bio={user.bio}
          />
          <div className="flex-1 flex flex-col lg:mt-5">
            <h1 className="text-3xl font-bold">
              {session?.id == id ? "Your" : "All"} Projects
            </h1>

            <ul className="grid grid-cols-1 md:grid-cols-2 mt-6 justify-center gap-1">
              <Suspense fallback={<ProjectListSkeleton length={4}/>}>
                <UserProjects id={id} />
              </Suspense>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
