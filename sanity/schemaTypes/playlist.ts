import { defineField, defineType } from "sanity";

export const playlist = defineType({
    name : 'playlist',
    title : 'playlist',
    type: 'document',
    
    fields : [
        defineField({
            name : 'slug',
            type : 'slug',
            options: {
                source : 'title'
            }
        }),
        defineField({
            name : 'title',
            type : 'string',
        }),
        defineField({
            name : 'select',
            type : 'array',
            of :[{type : 'reference' ,to :[{type : 'project'}]}]
        }),
       
    ],
   
})