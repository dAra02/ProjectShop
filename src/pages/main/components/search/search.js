import { Icon, Input } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className, seatchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input value={seatchPhrase} placeholder="Поиск товара..." onChange={onChange} />
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding: 10px 32px 10px 10px;
	}

	& > div {
		position: absolute;
		right: 9px;
		top: 4px;
	}
`;
