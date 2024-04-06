'use client'
import React, { useEffect, useRef, useState } from 'react'
import CarouselCard from './Cards/CarouselCard';
// Import css files
import AddToCartButton from './Buttons/AddToCartButton';
import CaptureButton from './Buttons/CaptureButton';
import { useQuery } from '@apollo/client';
import { FETCH_PRODUCTS } from '@/schema/schema';
import { setEffects, setSelectedEffect } from '@/app-redux/features/effectRendererSlice';
import { useDispatch } from 'react-redux';
import { Renderer } from '@/modules/Renderer';
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";

interface SliderContainerProps {
  onClick?: () => void;
}

type EffectType = {
  id: number;
  sku: string;
  name: string;
  productTitle: string;
  thumbPath: string;
  modelPath: string;
  size: string;
  color: string;
  price: number;
}


const SliderContainer = (props: SliderContainerProps) => {
  const dispatch = useDispatch()
  const containerRef = useRef()

  const { data, error, loading } = useQuery(FETCH_PRODUCTS, {
    variables: {
      "take": "15",
      "skip": "0",
      "fullText": undefined,
      "account": undefined,
      "email": undefined,
      "showcase": undefined,
      "productType": "hat"
    }
  })

  const onActiveSlideChange = (e: any) => {
    // e.preventDefault()
    // dispatch(setSelectedEffect(item))
    const activeModel = data?.effects.filter((item: any, idx: number) => e === idx)[0]
    if (activeModel) {
      Renderer.prototype.addEffect(activeModel.modelPath)
    }

  }

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or component
  }

  if (error) {
    return <div>Error loading data. Please try again.</div>; // Handle the error state
  }

  return (
    <div className='slider-container h-auto w-full flex items-center justify-center'>
      {/* <div className="capture-button-container w-full h-auto relative">
        <div className="button w-[50px] h-[50px] absolute left-[50%] right-[50%] -translate-x-[50%] -translate-y-[50%]">
          <CaptureButton />
        </div>
      </div>
      <div className='add-cart-btn-container p-5'>
        <AddToCartButton />
      </div> */}
      <ResponsiveContainer
        carouselRef={containerRef}
        render={(parentWidth, carouselRef) => {
          return (
            <StackedCarousel
              onActiveSlideChange={onActiveSlideChange}
              ref={carouselRef}
              slideComponent={CarouselCard}
              slideWidth={100}
              carouselWidth={parentWidth}
              data={data?.effects}
              currentVisibleSlide={3}
              maxVisibleSlide={3}
              swipeSpeed={0.1}
            // useGrabCursor
            />
          )
        }}
      />

    </div>
  )
}

export default SliderContainer;