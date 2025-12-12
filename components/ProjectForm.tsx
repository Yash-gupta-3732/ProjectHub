"use client";

import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import dynamic from "next/dynamic"; // <-- IMPORTANT
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useActionState } from "react";
import { z } from "zod";
import { formSchema } from "@/lib/validation";
import { createProject } from "@/lib/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Load MD Editor ONLY on client → fixes hydration mismatch
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const ProjectForm = () => {
  const router = useRouter();
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValue = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        imageurl: formData.get("imageurl") as string,
        details: details.trim(),
      };

      // Validate with Zod
      await formSchema.parseAsync(formValue);

      // Submit to server action
      const result = await createProject(prevState, formData, details);

      if (result.status === "success") {
        toast.success("Project submitted successfully!");
        router.push(`/project/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const flat: Record<string, string> = {};
        Object.entries(error.flatten().fieldErrors).forEach(([key, val]) => {
          flat[key] = Array.isArray(val) ? val[0] : "";
        });
        setErrors(flat);
        toast.error("Please fix the highlighted errors.");
        return { ...prevState, status: "Error" };
      }

      toast.error("An unexpected error occurred.");
      return { ...prevState, status: "Error" };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="project_form space-y-6">
      {/* TITLE */}
      <div>
        <label htmlFor="title" className="project-form_label">
          Title
        </label>
        <Input id="title" name="title" placeholder="Project Title" required />
        {errors.title && <p className="project-form_error">{errors.title}</p>}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label htmlFor="description" className="project-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="Short project description"
          required
        />
        {errors.description && (
          <p className="project-form_error">{errors.description}</p>
        )}
      </div>

      {/* CATEGORY */}
      <div>
        <label htmlFor="category" className="project-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          placeholder="Next.js, React, Vue, etc"
          required
        />
        {errors.category && (
          <p className="project-form_error">{errors.category}</p>
        )}
      </div>

      {/* IMAGE URL */}
      <div>
        <label htmlFor="imageurl" className="project-form_label">
          Project Image URL
        </label>
        <Input
          id="imageurl"
          name="imageurl"
          placeholder="https://example.com/image.png"
          required
        />
        {errors.imageurl && (
          <p className="project-form_error">{errors.imageurl}</p>
        )}
      </div>

      {/* DETAILS */}
      <div data-color-mode="light">
        <label htmlFor="details" className="project-form_label">
          Detailed Description
        </label>

        <MDEditor
          value={details}
          onChange={(v) => setDetails(v ?? "")}
          height={300}
          preview="edit"
          textareaProps={{
            placeholder: "Write full project details here...",
          }}
        />
        {errors.details && (
          <p className="project-form_error">{errors.details}</p>
        )}
      </div>

      {/* SUBMIT */}
      <Button disabled={isPending} type="submit" className="project-form_btn">
        {isPending ? "Submitting..." : "Add Project"}
      </Button>
    </form>
  );
};

export default ProjectForm;
