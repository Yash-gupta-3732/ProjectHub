import { client } from "@/sanity/lib/client";
import { PROJECT_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { Eye } from "lucide-react";
import React from "react";

const Views = async ({id}:{id:string}) => {
  const {views} = await client.withConfig({useCdn:false}).fetch(PROJECT_VIEWS_QUERY,{id}) // cdn is false because we want to update it in real time using the partial pre rendering
  await writeClient.patch(id).set({views:views + 1}).commit() // updating the views when some land on the project details where this views component renders
  return (
    <div className="view-container">
      <button disabled={true} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
         <Eye className="size-5 mr-2"/> {views} Views
        </span>
      </button>
    </div>
  );
};

export default Views;
