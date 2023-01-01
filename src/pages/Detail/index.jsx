import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { notification } from 'antd';
import { useMayLike } from '../../hooks/useLike';
import { addCartDetail, cartList } from '../../redux/features/cartSlice';
import {
	fetchProductDetail,
	selectedProduct,
} from '../../redux/features/productSlice';
import { getProductFav } from '../../redux/features/userSlice';

const Detail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		isLogin,
		productFaveMappingKeySelector,
		productFavSelector,
		handleToggleLike,
	} = useMayLike(() => dispatch(getProductFav()));

	const selectedProductSelector = useSelector(selectedProduct);
	const cartListSelector = useSelector(cartList);

	const getCartDetail = () => {
		if (cartListSelector.length === 0) return undefined;
		return cartListSelector.find(
			(item) => item.id.toString() === id.toString()
		);
	};
	const cartDetail = getCartDetail();

	const [countNumber, setCountNumber] = useState(() => {
		const cartDetail = getCartDetail();
		if (cartDetail)
			return cartDetail.quantity ? Number(cartDetail.quantity) : 1;
		return 1;
	});

	useEffect(() => {
		dispatch(fetchProductDetail(id));
		if (cartDetail?.quantity) setCountNumber(Number(cartDetail?.quantity));
		return () => {
			setCountNumber(1);
		};
	}, [id]);

	const handleAddToCart = (id) => {
		const cartDetail = getCartDetail();
		if (
			cartDetail &&
			cartDetail?.quantity >= selectedProductSelector.quantity
		) {
			notification.warning({
				message: (
					<p>
						max quantity of {selectedProductSelector.name} is{' '}
						{selectedProductSelector.quantity}
					</p>
				),
			});
		}
		dispatch(
			addCartDetail({
				id,
				image: selectedProductSelector.image,
				price: selectedProductSelector.price,
				name: selectedProductSelector.name,
				quantity: countNumber,
				maxQuantity: selectedProductSelector.quantity,
			})
		);
	};

	const plusCart = () => {
		setCountNumber((count) => count + 1);
	};

	const subCart = () => {
		if (countNumber === 1) return;
		setCountNumber((count) => count - 1);
	};

	return (
		<>
			<section className="detail flex mt-[58px]">
				<a
					href="#"
					className="w-[334px] h-[355px] bg-[#F8F8F8] px-[57px] pt-[109px] pb-[90px] block ml-[65px] relative"
				>
					{isLogin && (
						<div className="absolute top-6 right-6 z-100">
							{productFaveMappingKeySelector.includes(Number(id)) ? (
								<AiFillHeart
									size={40}
									color="red"
									onClick={(e) => handleToggleLike(e, false, id)}
								/>
							) : (
								<AiOutlineHeart
									size={40}
									color="red"
									onClick={(e) => handleToggleLike(e, true, id)}
								/>
							)}
						</div>
					)}
					<img
						src={selectedProductSelector?.image}
						alt=""
						className="w-[220px] object-cover detail__img"
					/>
				</a>
				<div className="detail__info-product flex-1 ml-[128px]">
					<h3 className="font-[300] text-[30px] leading-[36px] mt-[9px] mb-[9px] detail__title">
						{selectedProductSelector?.name}
					</h3>
					<p className="text-[16px] font-normal leading-[20px] text-[#140101] max-w-[503px] detail__desc">
						{selectedProductSelector?.description}
					</p>
					<p className="text-[#1ED90E] font-medium text-[24px] mt-4">
						Available size
					</p>
					<div className="detail__size flex gap-5 my-4">
						{selectedProductSelector?.size.length &&
						selectedProductSelector?.size?.length > 0
							? selectedProductSelector?.size.map((item, idx) => {
									return (
										<div
											className="size__box w-[50px] h-[50px] bg-[#CCCCCC] flex items-center justify-center"
											key={idx}
										>
											<span className="text-[24px] font-semibold leading-[29px]">
												{item}
											</span>
										</div>
									);
							  })
							: null}
					</div>
					<div>
						<span className="detail__price font-[600] leading-[36px] text-[30px] text-[#FC0303]">
							{selectedProductSelector?.price}$
						</span>
					</div>
					<div className="detail__quantity flex mt-4 mb-3 items-center">
						<button
							className="text-white w-[50px] h-[50px] bg-gradient-to-r from-[#6181F3] to-[#7C97F5] font-normal text-3xl flex items-center justify-center"
							onClick={() => plusCart(id)}
						>
							+
						</button>
						<p className="font-normal text-3xl px-5">{countNumber}</p>
						<button
							className="text-white w-[50px] h-[50px] bg-gradient-to-r from-[#6181F3] to-[#7C97F5] font-normal text-3xl flex items-center justify-center"
							onClick={() => subCart(id)}
						>
							-
						</button>
					</div>
					<button
						className="text-[#FFF8F8] w-[175px] h-[64px] bg-gradient-to-r from-[#3e20f8e6] to-[#D017EE] font-medium text-2xl"
						onClick={() => handleAddToCart(id)}
					>
						Add to cart
					</button>
				</div>
			</section>
			<section className="product-feature">
				<p className="text-[12px] text-[#c2c2c2]">Related Product</p>
				<h1 className="font-[400] text-[40px] text-center mt-[46px] mb-[89px]">
					-Related Product-
				</h1>
				<div className="product-feature__list max-w-[1136px] mx-auto grid grid-cols-3 gap-[67px]">
					{selectedProductSelector?.relatedProducts &&
					selectedProductSelector?.relatedProducts?.length
						? selectedProductSelector?.relatedProducts.map((item, idx) => {
								return (
									<div
										className="product-feature__item overflow-hidden bg-[#F8F8F8] cursor-pointer relative"
										onClick={() => navigate(`/detail/${item.id}`)}
										key={item.id}
									>
										{isLogin && (
											<div className="absolute top-6 right-6 z-100">
												{productFaveMappingKeySelector.includes(item?.id) ? (
													<AiFillHeart
														size={40}
														color="red"
														onClick={(e) =>
															handleToggleLike(e, false, item?.id)
														}
													/>
												) : (
													<AiOutlineHeart
														size={40}
														color="red"
														onClick={(e) => handleToggleLike(e, true, item?.id)}
													/>
												)}
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
										<div className="product-feature__bottom bg-[#DEDDDC] flex">
											<Link
												to={`/detail/${item.id}`}
												className="bg-[#9DE167] py-[14px] w-[175px] text-center"
											>
												<span className="text-[24px] text-[#000000] font-[200] tracking-wider">
													Buy now
												</span>
											</Link>
											<button className="font-[600] text-[24px] flex-1">
												{item.price}$
											</button>
										</div>
									</div>
								);
						  })
						: null}
				</div>
			</section>
		</>
	);
};

export default Detail;
