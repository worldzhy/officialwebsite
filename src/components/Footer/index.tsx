import { FC } from "react";
import styled from "@emotion/styled";
import Mouse from "../Icons/Mouse";
import { mobileMedia } from "../../constants";

const StyledFooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;
  width: 200rem;
  height: 90rem;
  color: white;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
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
