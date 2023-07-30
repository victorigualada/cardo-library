import { StyledContainer } from './styles';
import { ContainerProps } from '../../../shared/types/types';

const Container = ({ id, border, children, style }: ContainerProps) => (
  <StyledContainer id={id} style={style} border={border}>{children}</StyledContainer>
);

export default Container;
