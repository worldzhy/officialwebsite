import styled from "@emotion/styled";
import Mouse from "../Icons/Mouse";

const StyledFooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;
  height: 90rem;
  left: 50%;
  color: white;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50rem;
`;
const Footer = () => {
  return (
    <StyledFooterWrapper>
      <Mouse />
    </StyledFooterWrapper>
  );
};

export default Footer;
