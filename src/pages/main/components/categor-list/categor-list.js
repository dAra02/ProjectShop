import styled from 'styled-components';

const CategorListContainet = ({ className, name, onClick }) => {
	return (
		<div className={className} onClick={onClick}>
			{name}
		</div>
	);
};

export const CategorList = styled(CategorListContainet)`
	cursor: pointer;
	margin: 0 0 5px 0;
	font-size: 18px;
	font-weight: 500;
`;
