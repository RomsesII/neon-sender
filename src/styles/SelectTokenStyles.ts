import {css} from "@emotion/css";

export const SelectTokenStyles = {
    InfoBlock: css`
      width: 100%;
      background-color: black;
      justify-content: center;
      align-items: center;
      padding: 40px;
      border-radius: 16px;
    `,
    name: css`
      font-size: 32px;
      font-weight: 700;
      color: white;
      margin-bottom: 40px;
    `,
    info: css`
      font-weight: 600;
      font-size: 18px;
      color: white;
      margin-bottom: 40px;
      max-width: 400px;
    `,
    faucet: css`
      cursor: pointer;
      color: #D93C92;
      text-decoration: none;
    `,
    tokenLogo: css`
      width: 100%;
    `,
    tokenLogoContainer: css`
      width: 40px;
      margin-right: 12px;

    `,
    token: css`
      display: flex;
      align-items: center;
      margin-left: 12px;
    `,
}