"use client"
import React from 'react'


export type CartButtonProps = {
    onClick?: () => void
    className?: string
    label?: string
}

const CartButton = (props: CartButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            className={props.className}
        >
            {/* <Icon
                icon={{ prefix: "fas", iconName: 'cart-shopping' }}
                width={30} height={30}
                color='white'
            /> */}
        </button>
    )
}

export default CartButton