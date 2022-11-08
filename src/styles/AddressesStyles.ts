import {css} from "@emotion/css";

export const AddressesStyles = {
    textAreaBlock: css`
      border-radius: 16px;
      padding: 40px;
      background-color: rgba(0, 78, 207, .04);
      width: 70%;
      overflow: auto;
      margin-left: 15%;
      margin-right: 15%;
      margin-top: 120px;

    `,
    textArea: css`
      width: 70%;
      height: 10vh;
      resize: none;
      border-radius: 8px;
      font-size: 22px;
      font-weight: 500;
      padding: 12px;
      display: flex;
    `,
    name: css`
      color: black;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 24px;
    `,
    instruction: css`
      font-size: 18px;
      color: black;
      font-weight: 600;
      margin-bottom: 24px;
    `,
}