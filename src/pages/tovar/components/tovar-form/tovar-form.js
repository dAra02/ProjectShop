import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon, Input } from '../../../../components';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { saveTovarAsync } from '../../../../actions';
import styled from 'styled-components';

const TovarFormContainer = ({ className, tovar: { id, imageUrl, title, price, content, categorId } }) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const [priceValue, setPriceValue] = useState(price);
	const contentRef = useRef(null);
	const [selectedCategorId, setSelectedCategorId] = useState(categorId);
	const [categor, setCategor] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const requestServer = useServerRequest();

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
		setPriceValue(price);
	}, [imageUrl, title, price]);

	useEffect(() => {
		requestServer('fetchCategor').then(({ error, res }) => {
			if (error) {
				return;
			}

			setCategor(res);
		});
	}, [requestServer]);

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			saveTovarAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				price: priceValue,
				content: newContent,
				selectedCategorId,
			}),
		).then(() => navigate(`/admin`));
	};

	const onTovarChange = ({ target }) => {
		setSelectedCategorId(Number(target.value));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);
	const onPriceChange = ({ target }) => setPriceValue(target.value);

	return (
		<div className={className}>
			<Input value={imageUrlValue} placeholder="Изображение..." onChange={onImageChange} />
			<Input value={titleValue} placeholder="Заголовок..." onChange={onTitleChange} />
			<Input value={priceValue} placeholder="Цена..." onChange={onPriceChange} />
			<div className="icon-and-select">
				<div className="categor-select">
					<div className="text-categor">Выбор категории:</div>
					<select value={selectedCategorId} onChange={onTovarChange}>
						{categor.map(({ id: categorId, name }) => (
							<option key={categorId} value={categorId}>
								{name}
							</option>
						))}
					</select>
				</div>
				<div className="icon">
					<Icon id="fa-floppy-o" size="21px" margin="0 10px 0 0" onClick={onSave} />
				</div>
			</div>
			<div className="info">
				<span>Описание: </span>
				<div ref={contentRef} contentEditable={true} suppressContentEditableWarning={true} className="info-text">
					{content}
				</div>
			</div>
		</div>
	);
};

export const TovarForm = styled(TovarFormContainer)`
	padding: 25px 25px 0;

	& .text-categor {
		font-size: 21px;
		font-weight: 500;
		margin: 0 0 5px 0;
	}

	& .icon-and-select {
		display: flex;
		align-items: center;
		margin: 0 0 5px 0;
		justify-content: space-between;
	}

	& select {
		height: 50px;
		width: 100%;
		font-size: 20px;
	}

	& .icon {
		width: 25px;
	}

	& .info-text {
		min-height: 80px;
		border: 1px solid #000;
		font-size: 20px;
		margin: 10px 0 0 0;
		white-space: pre-line;
	}
`;
