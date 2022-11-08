import {css, cx} from "@emotion/css";
import {FunctionComponent, ReactChild} from "react";

const buttonStyles = {
    button: css`
      height: 64px;
      text-shadow: none;
      box-shadow: none;
      display: flex;
      align-items: center;
      color: #000;

      &.primary {
        background: white;

        :hover {
          background: rgba(0, 0, 0, 0.04);
        }
      }
    `,
}

interface ISelectButtonProps {
    type: "primary" | "ghost" | "text";
    onClick?: () => void;
    children:
        | (ReactChild | undefined | false)
        | (ReactChild | undefined | false)[];
    disabled?: boolean;
    className?: string;
}


export const SelectButton: FunctionComponent<ISelectButtonProps> = ({
                                                                        type,
                                                                        onClick = () => [],
                                                                        children,
                                                                        disabled,
                                                                        className,
                                                                    }) => {
    return (
        <button
            type="button"
            className={cx(buttonStyles.button, type, className)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
