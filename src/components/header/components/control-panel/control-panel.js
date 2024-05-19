import { Link, useNavigate } from 'react-router-dom';
import { Icon, Button } from '../../../../components';
import styled from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<RightAligned>
				<Button>
					<Link to="/login">Войти</Link>
				</Button>
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" margin="10px 0 0 0" onClick={() => navigate(-1)} />
				<Link to="/corzina">
					<Icon id="fa-shopping-cart" margin="10px 0 0 16px" />
				</Link>
				<Link to="/admin">
					<Icon id="fa-archive" margin="10px 0 0 16px" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
