'use client'

import { Message } from '@/model/User'
import React, { useState } from 'react'

const page = () => {
  const [messages,setmessages]= useState<Message[]>([])
  return (
    <div>Dashboard</div>
  )
}

export default page