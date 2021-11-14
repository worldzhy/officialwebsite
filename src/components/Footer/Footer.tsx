import styled from "@emotion/styled";
import Mouse from "../Icons/Mouse";

const StyledFooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90rem;
  color: white;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Footer = () => {
  return (
    <StyledFooterWrapper>
      <Mouse />
    </StyledFooterWrapper>
  );
};

export default Footer;
