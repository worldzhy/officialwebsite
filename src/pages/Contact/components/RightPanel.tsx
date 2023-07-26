import { FC, FormEventHandler, useContext, useState } from "react";
import styled from "@emotion/styled";
import { mobileMedia } from "../../../constants";
import { FormSubmitResult } from "../../../types";
import FormField from "./FormField";
import DataContext from "../../../contexts/DataContext";

const StyledFormWrapper = styled.div`
  margin-left: 190rem;
  margin-top: 95rem;
  width: 400rem;
  overflow-y: auto;
  padding-top: 100rem;
  ${mobileMedia} {
    width: 100%;
    padding: 20px;
    margin: 0;
    overflow-y: inherit;
  }
  form {
    display: flex;
    flex-direction: column;
    .field-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 50rem;
      font-family: Arial;
      ${mobileMedia} {
        margin-bottom: 20px;
      }
      label {
        font-size: 14rem;
        line-height: 16rem;
        font-weight: 700;
        ${mobileMedia} {
          font-size: 14px;
          line-height: 16px;
        }
      }
      input {
        font-size: 18rem;
        line-height: 20rem;
        background-color: transparent;
        padding-top: 8rem;
        padding-bottom: 10rem;
        border-bottom: 1px solid white;
        ${mobileMedia} {
          font-size: 18px;
          line-height: 20px;
          padding-top: 8px;
          padding-bottom: 10px;
        }
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
      font-size: 16rem;
      line-height: 24rem;
      background-color: white;
      font-family: Prompt-Regular;
      color: #6b7280;
      ${mobileMedia} {
        width: 88px;
        height: 40px;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
`;
const StyledResultView = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  font-size: 30rem;
  margin: 200rem 20rem 0 20rem;
  overflow: hidden;
  ${mobileMedia} {
    font-size: 18px;
    margin-top: 60px;
  }
`;

const RightPanel: FC = () => {
  const {
    contents: {
      contact: { form, resultTips },
    },
  } = useContext(DataContext);
  const [result, setResult] = useState<FormSubmitResult>(
    FormSubmitResult.Default
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await fetch(
        "https://0jkklwjmsh.execute-api.us-east-1.amazonaws.com/inceptionpad-official-site",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
          body: formData,
        }
      );
      setResult(FormSubmitResult.Success);
    } catch {
      setResult(FormSubmitResult.Failed);
    }
  };
  return result === FormSubmitResult.Default ? (
    <StyledFormWrapper className={"form-wrapper"}>
      {
        <form onSubmit={handleSubmit}>
          {Object.entries(form).map(([key, props]) => (
            <FormField key={key} {...props} name={key} />
          ))}

          <button className={"submit-btn"} type={"submit"}>
            Send
          </button>
        </form>
      }
    </StyledFormWrapper>
  ) : (
    <StyledResultView>{resultTips[result]}</StyledResultView>
  );
};

export default RightPanel;
