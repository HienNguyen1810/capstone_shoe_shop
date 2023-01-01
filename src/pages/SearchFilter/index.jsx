import React, { useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Empty, Form, Input, Select } from 'antd';
import { useMayLike } from '../../hooks/useLike';
import {
	fetchProducts,
	productListFilter,
	setPriceOrder,
	setSearchText,
} from '../../redux/features/productSlice';
import { getProductFav } from '../../redux/features/userSlice';

const SearchFilter = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const productListSelector = useSelector(productListFilter);
	const handleChange = (value) => {
		dispatch(setPriceOrder(value));
	};
	const onSubmit = (value) => {
		dispatch(setSearchText(value.keyword));
		dispatch(fetchProducts(value));
	};

	useEffect(() => {
		return () => {
			dispatch(setSearchText(''));
			dispatch(fetchProducts({ keyword: '' }));
			dispatch(setPriceOrder('desc'));
		};
	}, []);

	const {
		isLogin,
		productFaveMappingKeySelector,
		productFavSelector,
		handleToggleLike,
	} = useMayLike(() => dispatch(getProductFav()));

	return (
		<section className="mt-20">
			<div className="ml-[67px]">
				<Form
					form={form}
					layout="vertical"
					className="flex items-center gap-10 ml-[67px] "
					onFinish={onSubmit}
				>
					<div className="w-1/3">
						<Form.Item label="Search" name="keyword">
							<Input />
						</Form.Item>
					</div>
					<div>
						<button className="text-white bg-[#6200EE] text-sm font-medium py-4 px-7 rounded-[50px] active:scale-75 transition-all ease-in duration-150">
							SEARCH
						</button>
					</div>
				</Form>
			</div>

			<div
				className=" mt-[46px] pl-7 py-[7px] bg-gradient-to-b "
				style={{
					background: 'linear-gradient(180deg, #F21299 0%, #1B02B5 100%)',
				}}
			>
				<h1 className="text-[40px] font-[400] text-white">Search result</h1>
			</div>

			<div className="max-w-xs grid grid-cols-1 ml-[67px] mb-5">
				<span className="text-xs mt-7 text-[18px] mb-4">Price</span>
				<Select
					defaultValue="decreases"
					style={{
						width: 300,
					}}
					onChange={handleChange}
					options={[
						{
							value: 'desc',
							label: 'decrease',
						},
						{
							value: 'asc',
							label: 'increase',
						},
					]}
				/>
			</div>
			{productListSelector?.length > 0 ? (
				<div className="product-feature__list max-w-[1136px] mx-auto grid grid-cols-3 gap-[67px]">
					{productListSelector.map((item, idx) => {
						return (
							<div
								className="product-feature__item overflow-hidden bg-[#F8F8F8] cursor-pointer relative"
								key={item.id}
								onClick={() => navigate(`/detail/${item.id}`)}
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
			) : (
				<div className="flex w-full items-center justify-center">
					<Empty />
				</div>
			)}
		</section>
	);
};

export default SearchFilter;
