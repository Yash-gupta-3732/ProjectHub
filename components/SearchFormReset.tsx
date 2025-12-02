"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchFormReset = () => {
  const router = useRouter();

  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();

    router.push("/"); // clear ?query=... from URL
  };

  return (
    <button
      type="button"
      onClick={reset}
      className="search-btn text-white flex items-center justify-center p-2"
    >
      <X className="size-5" />
    </button>
  );
};

export default SearchFormReset;
