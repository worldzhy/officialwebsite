import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { mobileMedia } from "../../../constants";
import { CompanyInfoProps } from "../../../types";

const LocationListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${mobileMedia} {
    padding: 20px;
  }
  .summary {
    font-family: Prompt;
    font-size: 14rem;
    line-height: 21rem;
    max-width: 100%;
    margin-bottom: 20rem;
    ${mobileMedia} {
      font-size: 14px;
      line-height: 21px;
      white-space: normal;
    }
  }
  .list-wrapper {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .item {
      flex: 1 0 50%;
      max-width: 50%;
    }
    p {
      font-family: Prompt;
      font-size: 14rem;
      line-height: 21rem;
      ${mobileMedia} {
        font-size: 14px;
        line-height: 21px;
      }
    }
    img {
      min-height: 160rem;
      margin-bottom: 20rem;
    }
    .divider {
      margin: 0 2rem;
    }
    .country {
      font-weight: bold;
      font-family: Prompt;
    }
  }
`;

const LocationList: FunctionComponent<CompanyInfoProps> = ({
  summary,
  list,
}) => {
  return (
    <LocationListWrapper>
      <p className={"summary truncate"}>{summary}</p>
      <section className={"list-wrapper"}>
        {list.map(({ image, country, city }) => (
          <div key={city} className={"item"}>
            <img src={image} alt="" />
            <p>
              <span className={"city"}>{city}</span>
              <span className={"divider"}> · </span>
              <span className={"country"}>{country}</span>
            </p>
          </div>
        ))}
      </section>
    </LocationListWrapper>
  );
};

export default LocationList;
