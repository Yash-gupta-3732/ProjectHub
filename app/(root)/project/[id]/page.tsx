import React from 'react'
import { Boxes } from "../../../../components/ui/background-boxes";
import Image from 'next/image';
import Link from 'next/link';
import projectHub from '../../../../public/asset/projectHub.png'
import spotify from '../../../../public/asset/spotify.png'
const page = () => {
  return (
    <>
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
           <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
           <Boxes />
           <p className='tag tag-tri relative'>23 November 2025</p>
           <h1
             className='heading relative'
             >
            This is a masterpiece project
           </h1>
           <p className="sub-heading relative max-w-5xl text-center line-clamp-3">
            An innovative solution that revolutionizes the way we interact with technology, seamlessly integrating cutting-edge features to enhance user experience and drive efficiency across various applications.
           </p>
         </div>
         <section className='section_container'>
          <Image src={spotify } alt="" className='w-full h-auto rounded-xl' />
          <div className="space-y-5 mt-10 max-w-5xl mx-auto">
            <div className="flex justify-between gap-5">
              <Link href={'/'} className='flex gap-2 mb-3 items-center'>
              <Image src={projectHub} alt="" width={64} height={64} className='rounded-full drop-shadow-lg border-2' />
              <div>
                <p className='text-3xl'>Author Name</p>
                <p className='text-2xl'>@username</p>
              </div>
              </Link>
              <p className='category_tag'>Music</p>
            </div>
             <h3 className='text-3xl font-bold'>PROJECT DETAIL</h3>
             <p className='no-result'>No Details Provided</p>
          </div>
          <hr className='divider' />
         </section>
             </>
  )
}

export default page
