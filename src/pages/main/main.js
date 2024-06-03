import { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { TovarCard, CategorList, Pagination, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce, getLastPageFromLinks } from './utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [tovar, setTovar] = useState([]);
	const [categor, setCategor] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [sort, setSort] = useState('desc');
	const [idCategor, setIdCategor] = useState(null);

	const [seatchPhrase, setSeatchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	const requestServer = useServerRequest();
	useEffect(() => {
		Promise.all([requestServer('fetchTovary', seatchPhrase, page, PAGINATION_LIMIT, sort, idCategor), requestServer('fetchCategor')]).then(
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch, sort, idCategor]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSeatchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const onSortPrice = () => {
		sort === 'desc' ? setSort('asc') : setSort('desc');
	};

	return (
		<div className={className}>
			<Search seatchPhrase={seatchPhrase} onChange={onSearch} />
			<div className="obortca-componenta">
				<div className="categor">
					<h3>Категория товаров:</h3>
					{categor.map(({ id, name }) => (
						<CategorList
							key={id}
							name={name}
							onClick={() => {
								setIdCategor(id);
							}}
						/>
					))}
				</div>
				<div className="obortca">
					{tovar.length > 0 ? (
						<>
							<div className="sort-price">
								<div className="bloc-text-sort" onClick={onSortPrice}>
									{sort === 'desc' ? (
										<span>
											Сортировка цены по <span className="unicod">↓</span>
										</span>
									) : (
										<span>
											Сортировка цены по <span className="unicod">↑</span>
										</span>
									)}
								</div>
							</div>

							<div className="tovar-list">
								{tovar.map(({ id, title, imageUrl, price }) => (
									<TovarCard key={id} id={id} title={title} imageUrl={imageUrl} price={price} />
								))}
							</div>
						</>
					) : (
						<div className="no-tovar-found">Товары не найдены</div>
					)}
					{lastPage > 1 && tovar.length > 0 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
				</div>
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .obortca-componenta {
		flex-wrap: inherit;
		display: flex;
	}

	& span {
		display: flex;
		align-items: center;
	}

	& .unicod {
		font-size: 24px;
		font-weight: bold;
		margin: 0 0 0 5px;
	}

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

	& .tovar-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 20px 20px 20px;
	}

	& .no-tovar-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
