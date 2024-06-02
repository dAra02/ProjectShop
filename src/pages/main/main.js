import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { TovarCard, CategorList, Pagination } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks } from './utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [tovar, setTovar] = useState([]);
	const [categor, setCategor] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([requestServer('fetchTovary', page, PAGINATION_LIMIT), requestServer('fetchCategor')]).then(
			([
				{
					res: { tovary, links },
				},
				categorRes,
			]) => {
				setTovar(tovary);
				setLastPage(getLastPageFromLinks(links));
				setCategor(categorRes.res);
			},
		);
	}, [requestServer, page]);

	return (
		<div className={className}>
			<div className="categor">
				<h3>Категория товаров:</h3>
				{categor.map(({ id, name }) => (
					<CategorList
						key={id}
						name={name}
						onClick={() => {
							/*TODO*/
							console.log('categor');
						}}
					/>
				))}
			</div>
			<div className="obortca">
				<div className="sort-price">
					<div
						className="bloc-text-sort"
						onClick={() => {
							/*TODO*/
							console.log('sort');
						}}
					>
						Сортировать по цене
					</div>
				</div>
				<div className="post-list">
					{tovar.map(({ id, title, imageUrl, price }) => (
						<TovarCard key={id} id={id} title={title} imageUrl={imageUrl} price={price} />
					))}
				</div>
				{lastPage > 1 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)`
	flex-wrap: inherit;
	display: flex;

	& h3 {
		margin-bottom: 10px;
	}

	& .bloc-text-sort {
		cursor: pointer;
	}

	& .obortca {
		margin-top: 44px;
		width: 100%;
	}

	& .sort-price {
		font-size: 18px;
		font-weight: 500;
		padding: 10px;
		background: #eee;
		display: flex;
		justify-content: end;
		margin: 0 10px 0 10px;
		border: 1px solid #eee;
		border-radius: 25px;
	}

	& .categor {
		display: flex;
		flex-direction: column;
		background: #eee;
		border: 1px solid #eee;
		border-radius: 25px;
		width: 26%;
		padding: 10px;
		height: 260px;
		margin: 40px 0 0 25px;
	}

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 20px 20px 20px;
	}
`;
