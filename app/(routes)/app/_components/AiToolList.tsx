import Image from 'next/image'
import React from 'react'

const aiTools = [
  {
    name: 'Ai Product Image',
    desc: 'Generate High-quality, professional product images instantly with AI',
    bannerImage: '/product-image.png',
  },
  {
    name: 'Ai Product Video',
    desc: 'Create engaging product showcase video using AI',
    bannerImage: '/product-avatar.png',
  },
  {
    name: 'Ai Product With Avatar',
    desc: 'Bring your product to life with AI avatars',
    bannerImage: '/product-video.png',
  }
]

function AiToolList() {
  return (
    <div>
      <h2 className='font-bold text-2xl mb-2 '>Creative Tools</h2>
      <div>{aiTools.map((tool, index) => (
        <div key={index}>
          <div className=''>
            <h2 className='font-bold text-2xl'>{tool.name}</h2>
            <p className='opacity-60 mt-2'>{tool.desc}</p>
          </div>
          <Image src={tool.bannerImage} alt={tool.name} width={300} height={300} className='w-[200px]'/>
        </div>
      ))}</div>
    </div>
  )
}

export default AiToolList
