import React from "react";
import { EvervaultCard, Icon } from "../components/ui/evervault-card";
import imageurl from "../public/asset/fff.jpeg";

export function AnimatedProfileCard() {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col max-w-sm mx-auto p-4 relative h-[30rem] items-center">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text="hover" imageUrl={'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'} />

      <h2 className="dark:text-white text-black mt-4 text-lg font-bold text-center">
       Name Surname
      </h2>
      <p className="text-sm border font-bold line-clamp-2 pb-11 text-center dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores veritatis aperiam possimus nostrum dolorem aspernatur consequuntur nesciunt ipsa aliquid deleniti.
      </p>
    </div>
  );
}
