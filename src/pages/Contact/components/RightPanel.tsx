import styled from "@emotion/styled";
import { MouseEventHandler, useContext } from "react";
import DataContext from "../../../contexts/DataContext";
import FormField from "./FormField";

const StyledRightPanel = styled.div`
  margin-left: 190rem;
  margin-top: 95rem;
  width: 400rem;
  overflow-y: auto;
  padding-top: 100rem;
  form {
    display: flex;
    flex-direction: column;
    .field-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 50rem;
      font-family: Arial;
      label {
        font-size: 14rem;
        line-height: 16rem;
        font-weight: 700;
      }
      input {
        font-size: 18rem;
        line-height: 20rem;
        background-color: transparent;
        padding-top: 8rem;
        padding-bottom: 10rem;
        border-bottom: 1px solid white;

        &:focus {
          outline: none;
          border-bottom: 1px solid white;
        }
        &.error {
          border-bottom: 1px solid indianred;

          &:focus {
            border-bottom: 1px solid white;
          }
        }
      }
    }
    .submit-btn {
      width: 88rem;
      height: 40rem;
      font-family: Prompt-Regular;
      font-size: 16rem;
      line-height: 24rem;
      background-color: white;
      color: #6b7280;
    }
  }
`;
const RightPanel = () => {
  const {
    contents: {
      contact: { form },
    },
  } = useContext(DataContext);
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <StyledRightPanel className={"form-wrapper"}>
      <form>
        {Object.entries(form).map(([key, props]) => (
          <FormField key={key} {...props} name={key} />
        ))}

        <button className={"submit-btn"} onClick={handleSubmit}>
          Send
        </button>
      </form>
    </StyledRightPanel>
  );
};

export default RightPanel;
