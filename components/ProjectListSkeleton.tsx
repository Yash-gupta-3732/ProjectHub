import { ProjectCardSkeleton } from "./ProjectCardSkeleton";

export default function ProjectListSkeleton({length}:{length:number}) {
  return (
    <>
      {Array.from({ length: length }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </>
  );
}
