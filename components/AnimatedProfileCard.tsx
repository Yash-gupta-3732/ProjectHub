import React from "react";
import { EvervaultCard, Icon } from "../components/ui/evervault-card";

type AnimatedProfileCardProps = {
  username: string;
  imageUrl: string;
  name: string;
  bio: string;
};
export function AnimatedProfileCard({
  username,
  imageUrl,
  name,
  bio,
}: AnimatedProfileCardProps) {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col max-w-sm mx-auto p-4 relative h-[30rem] items-center">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text={name} imageUrl={imageUrl} />

      <h2 className="dark:text-white text-black mt-4 text-lg font-bold text-center">
        {`@${username}`}
      </h2>
      <p className="text-sm border font-bold line-clamp-2 p-10 text-center dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
        {bio}
      </p>
    </div>
  );
}
