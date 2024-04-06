"use client"
import React from 'react'
import Icon from '../Icon'

const IconButtonExample = () => {
  return (
    <button className='min-w-[60px] h-[50px] rounded-md border p-2 flex items-center justify-center'>
      <Icon icon={{ prefix: "fas", iconName: "cart-plus" }} color="balck" width={20} height={20} />
    </button>
  )
}

export default IconButtonExample
