import React from 'react'
import ProjectForm from '@/components/ProjectForm'
import {auth} from '../../../auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();
  if(!session){
    redirect('/');
  }
  return (
    <>
    <section className='pattern form_container min-h-[230px]'>
        <h1 className='heading'>
        Create a New Project
        </h1>
    </section>
      <ProjectForm />
    </>
  )
}

export default page
