"use client"
import React from 'react'


interface AddToCartButtonProps {
	onClick?: (e: any) => void
	className?: string
}

const AddToCartButton = (props: AddToCartButtonProps) => {

	const handleButtonClick = (e: any) => {
		e.preventDefault()
	}
	return (
		<button
			onClick={handleButtonClick}
			className='add-to-cart-button w-[121px] h-[30px] bg-[#E2E4E5] rounded-full text-fontColor border-borderColor border-2 text-sm shadow-inner font-medium'
		>
			Add To Cart
		</button>
	)
}

export default AddToCartButton