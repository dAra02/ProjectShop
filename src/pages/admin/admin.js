import { useEffect, useState } from 'react';
import { Button, Content, H2 } from '../../components';
import { TovarRow, TableRow } from './components';
import { useServerRequest } from '../../hooks';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal } from '../../actions';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AdminContainer = ({ className }) => {
	const [tovary, setTovary] = useState([]);
	const [categor, setCategor] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateTovarList, setShouldUpdateTovarList] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([requestServer('fetchTovaryAdmin'), requestServer('fetchCategor')]).then(([tovaryRes, categorRes]) => {
			if (tovaryRes.error || categorRes.error) {
				setErrorMessage(tovaryRes.error || categorRes.error);
				return;
			}

			setTovary(tovaryRes.res);
			setCategor(categorRes.res);
		});
	}, [requestServer, shouldUpdateTovarList]);

	const onTovarRemove = (tovarId) => {
		dispatch(
			openModal({
				text: 'Удалить товар?',
				onConfirm: () => {
					requestServer('removeTovar', tovarId).then(() => {
						setShouldUpdateTovarList(!shouldUpdateTovarList);
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<div className="verhuska">
					<H2>Товары</H2>
					<Button width="195px" onClick={() => navigate('/admin/tovar')}>
						Добавить товар
					</Button>
				</div>
				<div>
					<TableRow>
						<div className="image-url-columm">Фото</div>
						<div className="title-columm">Название</div>
						<div className="categor-columm">Категория</div>
						<div className="price-columm">Цена</div>
					</TableRow>

					{tovary.map(({ id, title, imageUrl, price, categorId }) => (
						<TovarRow
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							price={price}
							categor={categor}
							categorId={categorId}
							onTovarRemove={() => onTovarRemove(id)}
						/>
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

	& .verhuska {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 116%;
	}

	& button {
		background: #dbaf3d;
		border-radius: 25px;
		height: 45px;
		font-size: 22px;
	}
`;
