import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import StyledLogo from './Header.styled';

const Header = () => {
  return (
    <StyledLogo>
      <Link component={RouterLink} to='/'>
        <img src={logo} alt='Logo' />
      </Link>
    </StyledLogo>
  );
};

export default Header;
