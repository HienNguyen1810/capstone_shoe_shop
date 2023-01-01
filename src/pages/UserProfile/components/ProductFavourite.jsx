import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Empty } from 'antd';
import { useMayLike } from '../../../hooks/useLike';
import { getProductFav } from '../../../redux/features/userSlice';

const ProductFavourite = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLogin, productFavSelector, handleToggleLike } = useMayLike(() =>
		dispatch(getProductFav())
	);

	return productFavSelector?.length > 0 ? (
		<div className="max-w-[1136px] mx-auto grid grid-cols-3 gap-[67px]">
			{productFavSelector.map((item, idx) => {
				return (
					<div
						className="product-feature__item overflow-hidden bg-[#F8F8F8] cursor-pointer relative"
						key={item.id}
						onClick={() => navigate(`/detail/${item?.id}`)}
					>
						{isLogin && (
							<div className="absolute top-6 right-6 z-100">
								<AiFillHeart
									size={40}
									color="red"
									onClick={(e) => handleToggleLike(e, false, item?.id)}
								/>
							</div>
						)}
						<div className="product-feature__info text-center">
							<img
								src={item.image}
								className="object-cover w-[220px] inline-block mb-[30px] mt-[45px]"
								alt=""
							/>
							<p className="text-left font-[300] text-[24px] ml-[23px] leading-[29px] truncate">
								{item.name}
							</p>
							<p className="text-left ml-[23px] font-[300] text-[20px] text-[#CBC9C9] mt-[8px] mb-[13px] leading-[24px] truncate">
								{item.shortDescription}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	) : (
		<div className="flex w-full items-center justify-center">
			<Empty />
		</div>
	);
};

export default ProductFavourite;
