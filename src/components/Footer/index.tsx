import { FC } from "react";
import styled from "@emotion/styled";
import Mouse from "../Icons/Mouse";
import { mobileMedia } from "../../constants";

const StyledFooterWrapper = styled.footer`
  position: absolute;
  width: 200rem;
  height: 90rem;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  z-index: 10;
  color: white;
  ${mobileMedia} {
    bottom: 20px;
  }
`;
const Footer: FC = () => (
  <StyledFooterWrapper>
    <Mouse />
  </StyledFooterWrapper>
);

export default Footer;
