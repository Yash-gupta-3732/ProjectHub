import React from 'react'
import { client } from '@/sanity/lib/client'
import { PROJECT_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import { ThreeDCard } from './ThreeDCard';
import { ProjectTypeCard } from './ProjectCard';

const UserProject = async ({id}:{id:string}) => {
    const project = await client.fetch(PROJECT_BY_AUTHOR_QUERY,{id})
 
  return (
    <>
     { project?.length > 0 ?(project.map((post:ProjectTypeCard, index:number) =>(
       <li key={post._id}>
          <ThreeDCard post = {post} />
        </li>
      ))):(<p className="no-result">No projects found.</p>
      )
    }
    </>
  )
}

export default UserProject
