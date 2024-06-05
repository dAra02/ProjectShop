import { useEffect, useState } from 'react';
import { Button, PrivateContent, H2 } from '../../components';
import { TovarRow, TableRow } from './components';
import { useServerRequest } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils';
import { selectUserRole } from '../../selectors';
import styled from 'styled-components';

const AdminContainer = ({ className }) => {
	const [tovary, setTovary] = useState([]);
	const [categor, setCategor] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateTovarList, setShouldUpdateTovarList] = useState(false);
	const userRole = useSelector(selectUserRole);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const requestServer = useServerRequest();

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([requestServer('fetchTovaryAdmin'), requestServer('fetchCategor')]).then(([tovaryRes, categorRes]) => {
			if (tovaryRes.error || categorRes.error) {
				setErrorMessage(tovaryRes.error || categorRes.error);
				return;
			}

			setTovary(tovaryRes.res);
			setCategor(categorRes.res);
		});
	}, [requestServer, shouldUpdateTovarList, userRole]);

	const onTovarRemove = (tovarId) => {
		dispatch(
			openModal({
				text: 'Удалить товар?',
				onConfirm: () => {
					if (!checkAccess([ROLE.ADMIN], userRole)) {
						return;
					}
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
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
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
			</PrivateContent>
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
