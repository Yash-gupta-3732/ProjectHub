 "use client"
import Form from "next/form";
import React from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
const ProjectForm = () => {
  return (
    <Form action={"/"} scroll={false} className="project_form">
      <div className="">
        <div>
          <label htmlFor="title" className="project-form_label">
            Title
          </label>
          <Input
            id="title"
            name="title"
            className="project-form_input"
            placeholder="Project Title"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="project-form_label">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            className="project-form_textarea"
            placeholder="Project Description"
            required
          />
        </div>
        <div>
            <label htmlFor="category" className="project-form_label">Category</label>
            <Input id="category"
            name="category"
            className="project-form_input"
            placeholder="Project Category(Nextjs, React, Vue etc)"
            required/>
        </div>
         <div>
            <label htmlFor="projecturl" className="project-form_label">Project Url</label>
            <Input id="projecturl"
            name="category"
            className="project-form_input"
            placeholder="Project Url"
            required/>
        </div>
    <div data-color-mode='light'>
        <label htmlFor="details" className="project-form_label">Detail</label>
        <MDEditor
        id="details"
        preview="edit"
        height={300}
        style={{borderRadius:20,overflow:'hidden'}}
        textareaProps={{
            placeholder:'Describe your project in detail'
        }}
        previewOptions={{
            disallowedElements:['style']
        }}/>
    </div>
      </div>
    </Form>
  );
};

export default ProjectForm;
