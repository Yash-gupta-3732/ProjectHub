import React from 'react'
import { AnimatedProfileCard } from '@/components/AnimatedProfileCard';
import { ThreeDCard } from '@/components/ThreeDCard';

const page = ( {params} : {params: {id:string}}) => {
    const {id} = params;
    console.log(id);
  return (
    <div>
       <section className='profile_container'>
        <AnimatedProfileCard />
        <div className="flex-1 flex flex-col lg:mt-5">
          <h1 className='text-3xl font-bold'>All Projects</h1>
          
                  <ul className="grid grid-cols-1 md:grid-cols-2 mt-6 justify-center gap-1">
                    {[
                      "Project 1",
                      "Project 2",
                      "Project 3",
                      "Project 4",
                      "Project 5",
                      "Project 6",
                    ].map((project, index) => (
                      <li
                        key={index}
                      >
                       <ThreeDCard />
                      </li>
                    ))}
                  </ul>
        </div>
       </section>
    </div>
  )
}

export default page
