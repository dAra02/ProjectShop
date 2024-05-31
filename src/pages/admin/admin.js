import { useEffect, useState } from 'react';
import { Content, H2 } from '../../components';
import { TovarRow, TableRow } from './components';
import { useServerRequest } from '../../hooks';
import styled from 'styled-components';

const AdminContainer = ({ className }) => {
	const [tovary, setTovary] = useState([]);
	const [categor, setCategor] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([requestServer('fetchTovary'), requestServer('fetchCategor')]).then(([tovaryRes, categorRes]) => {
			if (tovaryRes.error || categorRes.error) {
				setErrorMessage(tovaryRes.error || categorRes.error);
				return;
			}

			setTovary(tovaryRes.res);
			setCategor(categorRes.res);
		});
	}, [requestServer]);

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<H2>Товары</H2>
				<div>
					<TableRow>
						<div className="image-url-columm">Фото</div>
						<div className="title-columm">Название</div>
						<div className="categor-columm">Категория</div>
						<div className="price-columm">Цена</div>
					</TableRow>

					{tovary.map(({ id, title, imageUrl, price, categorId }) => (
						<TovarRow key={id} id={id} title={title} imageUrl={imageUrl} price={price} categor={categor} categorId={categorId} />
					))}
				</div>
			</Content>
		</div>
	);
};

export const Admin = styled(AdminContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 680px;
	font-size: 18px;
`;
