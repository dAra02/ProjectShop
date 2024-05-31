import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, H2 } from '../../components';
import { useParams } from 'react-router-dom';
import { loadTovarAsync } from '../../actions';
import { useServerRequest } from '../../hooks';
import { selectTovar } from '../../selectors';
import styled from 'styled-components';

const TovarContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const tovar = useSelector(selectTovar);

	useEffect(() => {
		dispatch(loadTovarAsync(requestServer, params.id));
	}, [requestServer, dispatch, params.id]);

	const { imageUrl, title, price, content } = tovar;
	return (
		<div className={className}>
			<div className="info">
				<img src={imageUrl} alt="foto" />
				<H2>{title}</H2>
				<div className="price">
					Цена: {price}
					<Button width="135px" onClick={() => dispatch(/*TODO*/)}>
						Купить
					</Button>
				</div>

				<div className="tovar-text">
					<span>Описание:</span>
					<br></br>
					{content}
				</div>
			</div>
		</div>
	);
};

export const Tovar = styled(TovarContainer)`
	margin: 40px 25px;
	padding: 0 25px 25px;
	background: #eee;
	border: 10px solid orange;
	border-radius: 50px;

	& button {
		border-radius: 15px;
		width: 135px;
		height: 45px;
		background: #bbf8bb;
		border: 4px solid orange;
		font-size: 20px;
		font-weight: bold;
	}

	& button:hover {
		background-color: #66cc66;
		color: #ffffff;
	}

	& img {
		float: left;
		border: 10px solid orange;
		padding: 5px;
		border-radius: 25px;
		margin: 0 20px 10px 0;
	}
	& span {
		font-size: 24px;
		font-weight: 500;
		margin: 0 5px 0 0;
	}

	& .price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		font-weight: 500;
	}

	& .tovar-text {
		font-size: 18px;
		margin: 20px 0 0 0;
	}
`;
