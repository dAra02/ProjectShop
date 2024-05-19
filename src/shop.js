import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const AppColumm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 120px 0;
`;

const H2 = styled.h2`
	text-align: center;
`;
const Header = () => <div>Шапка</div>;
const Footer = () => <div>Футер</div>;

export const Shop = () => {
	return (
		<AppColumm>
			<Header />

			<Page>
				<H2>Главная</H2>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/admin" element={<div>Админка</div>} />
					<Route path="/corzina" element={<div>Корзина</div>} />
					<Route path="/tovar/:tovarId" element={<div>Статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>

			<Footer />
		</AppColumm>
	);
};
