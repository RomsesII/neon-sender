import {css} from "@emotion/css";


export const ConnectorHeaderStyles = {
    connectorBlock: css`
      width: 100%;
      background-color: black;
      justify-content: center;
      align-items: center;
    `,
    container: css`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
    `,
    contentBlock: css`
      padding-top: 12px;
      padding-bottom: 12px;
      margin-left: 14%;
      margin-right: 11%;
      display: flex;
      justify-content: space-between;
    `,
    address: css`
      background-color: black;
      border: 2px solid #D93C92;
      border-radius: 16px;
      padding: 0px 12px;
      font-size: 16px;
      font-weight: 700;
      color: white;
      display: flex;
      align-items: center;

      :hover {
        background-color: black;
        color: white;
      }

    `,
    name: css`
      color: white;
      font-size: 20px;
      font-weight: 500;
    `,

    neonLogo: css`
      width: 100%;
    `,
    logoContainer: css`
      padding-top: 4px;
      width: 160px;
    `,
    connect: css`
      background-color: black;
      border: 2px solid #D93C92;
      border-radius: 16px;
      padding: 0px 12px;
      font-size: 16px;
      font-weight: 700;
      color: white;
      display: flex;
      align-items: center;

      :hover {
        background-color: #D93C92;
        color: black;
      }
    `
}