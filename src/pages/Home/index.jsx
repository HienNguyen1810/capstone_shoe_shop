import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SliderList } from './components/SliderList';
import { useMayLike } from '../../hooks/useLike';
import { productList } from '../../redux/features/productSlice';
import { getProductFav } from '../../redux/features/userSlice';
import './index.less';

const Home = () => {
	const navigate = useNavigate();
	const productListSelector = useSelector(productList);
	const dispatch = useDispatch();

	const {
		isLogin,
		productFaveMappingKeySelector,
		productFavSelector,
		handleToggleLike,
	} = useMayLike(() => dispatch(getProductFav()));

	return (
		<section className="product-feature">
			<SliderList />
			<p className="text-[12px] text-[#c2c2c2]">Product Feature</p>
			<div
				className=" my-[35px] pl-7 py-[7px] bg-gradient-to-b "
				style={{
					background: 'linear-gradient(180deg, #F21299 0%, #1B02B5 100%)',
				}}
			>
				<h1 className="text-[40px] font-[400] text-white">Product Feature</h1>
			</div>
			<div className="product-feature__list max-w-[1136px] mx-auto grid grid-cols-3 gap-[67px]">
				{productListSelector?.map((item, idx) => {
					return (
						<div
							className="product-feature__item overflow-hidden bg-[#F8F8F8] cursor-pointer relative"
							key={item.id}
							onClick={() => navigate(`/detail/${item?.id}`)}
						>
							{isLogin && (
								<div className="absolute top-6 right-6 z-100">
									{productFaveMappingKeySelector.includes(item?.id) ? (
										<AiFillHeart
											size={40}
											color="red"
											onClick={(e) => handleToggleLike(e, false, item?.id)}
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
				})}
			</div>
		</section>
	);
};

export default Home;
