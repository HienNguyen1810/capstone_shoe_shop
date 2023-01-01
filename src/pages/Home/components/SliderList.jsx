import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export const SliderList = (props) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<div className="slider__shoes-list">
			<Slider {...settings}>
				<div className="slider__shoes-item">
					<div className="slider__shoes-content flex items-center w-[100%]">
						<div className="p-[100px] pt-[46px]">
							<img src="image 5.svg" alt="" />
						</div>
						<div className="slider__shoes-info mb-32">
							<div className="slider__shoes-title">
								<p className="font-light text-[40px] text-[#000000]">
									Product name
								</p>
								<p>Product description...</p>
								<button className="text-white bg-[#F8B653] py-[13px] px-[35px] mt-5">
									Buy now
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="slider__shoes-item">
					<div className="slider__shoes-content flex items-center w-[100%]">
						<div className="p-[100px] pt-[46px]">
							<img src="image 5.svg" alt="" />
						</div>
						<div className="slider__shoes-info mb-32">
							<div className="slider__shoes-title">
								<p className="font-light text-[40px] text-[#000000]">
									Product name
								</p>
								<p>Product description...</p>
								<button className="text-white bg-[#F8B653] py-[13px] px-[35px] mt-5">
									Buy now
								</button>
							</div>
						</div>
					</div>
				</div>
			</Slider>
		</div>
	);
};
