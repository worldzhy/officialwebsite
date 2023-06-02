import styled from "@emotion/styled";
import { FC, FormEventHandler, useContext, useState } from "react";
import DataContext from "../../../contexts/DataContext";
import FormField from "./FormField";
import { FormSubmitResult } from "../../../types";

const StyledFormWrapper = styled.div`
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

const StyledResultView = styled.div`
  font-size: 30rem;
  flex: 1;
  margin: 200rem 20rem 0 20rem;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
