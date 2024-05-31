import { useDispatch } from 'react-redux';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import styled from 'styled-components';

const TovarRowContainer = ({ className, imageUrl, title, price, categor, categorId }) => {
	const dispatch = useDispatch();

	return (
		<div className={className}>
			<TableRow>
				<div className="image-url-columm">
					<img src={imageUrl} alt="фото" />
				</div>
				<div className="title-columm">{title}</div>
				<div className="categor-columm">{categor.map(({ id, name }) => (id === categorId ? name : ''))}</div>
				<div className="price-columm">{price}</div>
			</TableRow>
			<Icon id="fa-pencil" margin="0 0 0 10px" onClick={() => dispatch(/*TODO*/)} />
			<Icon id="fa-trash-o" margin="0 0 0 10px" onClick={() => dispatch(/*TODO*/)} />
		</div>
	);
};

export const TovarRow = styled(TovarRowContainer)`
	display: flex;
	margin-top: 10px;
	align-items: center;
	border: 1px solid #000;
	padding: 10px;
	border-radius: 25px;
	background: #bfbfbf;

	& img {
		border: 3px solid #000;
		height: 130px;
	}
`;
