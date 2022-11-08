import {FC, ReactElement, useRef, useState} from "react";
import {css, cx} from "@emotion/css";
import {SelectButton} from "./SelectButton";
import arrow from "./../../assets/icons/arrow.svg"

const selectStyles = {
    select: css`
      position: relative;

      > button {
        background: white !important;
        border-radius: 8px;
        padding-left: 0 !important;
        font-weight: 700;
        font-size: 20px;
        width: 100%;
        cursor: pointer;

        img {
          margin-right: 16px;
        }

        .arrowdown {
          transition: all 0.3s;
          margin-left: 12px;
          width: auto;
          color: white;

        }
      }
    `,
    opened: css`
      > button {
        .arrowdown {
          transform: rotate(180deg);
        }
      }

      [data-options] {
        max-height: 400px;
        visibility: visible;
      }
    `,
    option: css`
      color: black;
      padding: 12px;
      text-align: left;
      white-space: nowrap;
      cursor: pointer;

      :hover {
        background: white;
      }
    `,
    options: css`
      position: absolute;
      background: black;
      top: calc(100% + 8px);
      left: 0;
      display: flex;
      flex-direction: column;
      max-height: 0;
      visibility: hidden;
      min-width: 100%;
      padding: 12px 0;
      border: 1px solid #000000;
      z-index: 1000;

    `,
    empty: css`
      margin-left: 12px;
    `
}

interface ISelectProps {
    value: string;
    onChange: (v: string) => void;
    options: {
        text: ReactElement | string;
        value: string;
    }[];
    className?: string;
    tokenBalance: number
}

const Select: FC<ISelectProps> = ({value, options, className, onChange, tokenBalance}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selected = options.find(({value: _value}) => _value === value);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={ref}
            className={cx(selectStyles.select, className, isOpen && selectStyles.opened)}
        >
            <SelectButton type="primary" onClick={() => setIsOpen(!isOpen)}>
                {selected?.text || <div
                    className={selectStyles.empty}>{'Tokens list'}</div>} {selected?.text ? `(${tokenBalance.toFixed(2)})` : ''}
                <img
                    src={arrow}
                    className="arrowdown"/>
            </SelectButton>
            <div className={selectStyles.options} data-options>
                {options.map(({text, value}) => (
                    <button
                        key={`select-${value}`}
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                            onChange(value);
                        }}
                        className={selectStyles.option}
                    >
                        {text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Select;
