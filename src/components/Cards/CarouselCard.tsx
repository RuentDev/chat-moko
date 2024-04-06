'use client'
import React, { memo } from 'react';
import Image from 'next/image';

const CarouselCard = memo((props: any) => {
	const { thumbPath } = props.data[0];

	const handleOnClick = () => {
		props.swipeTo(props.dataIndex)
	}

	return (
		<div className={`card-container m-0 p-0 select-none`} onClick={handleOnClick} >
			<div className={`image-container flex justify-center w-[100px] h-[100px] relative rounded-full overflow-hidden`}>
				{thumbPath && <Image
					src={thumbPath?.replace("hokei-backup.s3.amazonaws.com", "s3.amazonaws.com/hokei-backup")}
					priority
					width={100}
					height={100}
					alt="carousel image"
					draggable={false}
					className='card-image w-full h-full absolute object-center object-contain'
				/>}
			</div>
		</div>
	)

});

export default CarouselCard;