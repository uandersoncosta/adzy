import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const aiTools = [
  {
    name: "Imagem de Produto com IA",
    desc: "Gere imagens de produto profissionais e de alta qualidade instantaneamente com IA",
    bannerImage: "/product-image.png",
    path: "/"
  },
  {
    name: "Vídeo de Produto com IA",
    desc: "Crie vídeos envolventes de apresentação de produto usando IA",
    bannerImage: "/product-avatar.png",
    path: "/"
  },
  {
    name: "Produto com Avatar IA",
    desc: "Dê vida ao seu produto com avatares gerados por IA",
    bannerImage: "/product-video.png",
    path: "/"
  }

]

function AiToolList() {
  return (
    <div>
      <h2 className='font-bold text-2xl mb-2 '>Creative Tools</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>{aiTools.map((tool, index) => (
        <div key={index} className='flex items-center justify-between p-7 bg-zinc-700 rounded-2xl'>
          <div>
            <h2 className='font-bold text-2xl'>{tool.name}</h2>
            <p className='opacity-60 mt-2'>{tool.desc}</p>
            <Button className='mt-4'>Criar Agora</Button>
          </div>
          <Image src={tool.bannerImage} alt={tool.name} width={300} height={300} className='w-[200px]' />
        </div>
      ))}
      </div>
    </div>
  )
}

export default AiToolList
