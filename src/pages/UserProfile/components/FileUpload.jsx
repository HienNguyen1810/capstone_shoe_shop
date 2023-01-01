import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { userProfile } from '../../../redux/features/userSlice';

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const FileUpload = () => {
	const userProfileSelector = useSelector(userProfile);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
		);
	};

	const handleChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
		</div>
	);

	useEffect(() => {
		if (userProfileSelector) {
			setFileList([
				{
					uid: '-1',
					name: 'image.png',
					status: 'done',
					url: userProfileSelector.avatar,
				},
			]);
		}
	}, [JSON.stringify(userProfileSelector)]);

	return (
		<>
			<Upload
				action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				beforeUpload={() => {
					return false;
				}}
			>
				{fileList.length >= 1 ? null : uploadButton}
			</Upload>

			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img
					alt="example"
					className="object-cover max-h-[400px] w-full"
					src={previewImage}
				/>
			</Modal>
		</>
	);
};

export default FileUpload;
