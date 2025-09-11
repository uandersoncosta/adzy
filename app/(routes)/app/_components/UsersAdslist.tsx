'use client'

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'

function UsersAdslist() {
  const [adsList, setAdsList] = useState([]);

  return (
    <div>
      <h2 className='font-bold text-2xl mb-2 mt-5'>Meus Anúncios</h2>
      {adsList?.length == 0 &&
        <div className='p-5 border-dashed border-2 rounded-2xl flex flex-col items-center justify-center mt-6 gap-3'>
          <Image src={'/signboard.png'} alt='empy' width={200} height={200} className='w-20' />
          <h2 className='text-xl'>Você não tem nenhum anúncio criado</h2>
          <Button>Criar novo Anúncio</Button>
        </div>
      }
    </div>
  )
}

export default UsersAdslist
