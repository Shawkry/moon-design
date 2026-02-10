import React, { useCallback, useMemo, useState, useEffect } from "react";
import classnames from "classnames";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import type { ICounter } from "./types";
import * as styles from "./styles/counter.css";

const Counter: React.FC<ICounter> = (props) => {
  const [value, setValue] = useState<number>(props.value ?? 0);

  const [inputValue, setInputValue] = useState<string>(value.toString());

  const flexDirection = useMemo(() => {
    return props.reverseOrder ? "row-reverse" : "row";
  }, [props.reverseOrder]);

  const step = useMemo(() => {
    return props.step ?? 1;
  }, [props.step]);

  const maxValue = useMemo(() => {
    return props.maxValue ?? Infinity;
  }, [props.maxValue]);

  const minValue = useMemo(() => {
    return props.minValue ?? -Infinity;
  }, [props.minValue]);

  const minusDisabled = useMemo(() => {
    if (props.disabled) return true;
    return value <= minValue;
  }, [minValue, props.disabled, value]);

  const plusDisabled = useMemo(() => {
    if (props.disabled) return true;
    return value >= maxValue;
  }, [maxValue, props.disabled, value]);

  const handleChange = useCallback(
    (value: number) => {
      setValue(value);
      setInputValue(value.toString());
      props.onChange?.(value);
    },
    [props],
  );

  // 超过阈值时返回阈值
  const clampValue = useCallback(
    (value: number): number => {
      const clampedValue = Math.min(Math.max(value, minValue), maxValue);
      return props.float ? clampedValue : Math.floor(clampedValue);
    },
    [maxValue, minValue, props.float],
  );

  const handleMinus = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>): void => {
      event.stopPropagation();
      handleChange(clampValue(value - step));
    },
    [clampValue, handleChange, step, value],
  );

  const handlePlus = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>): void => {
      event.stopPropagation();
      handleChange(clampValue(value + step));
    },
    [clampValue, handleChange, step, value],
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const valueNum = Number(event.target.value);
      const newValue = clampValue(valueNum);
      handleChange(newValue);
    },
    [clampValue, handleChange],
  );

  const handleBlur = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = props.float
        ? value.toString()
        : Math.floor(value).toString();
      setInputValue(newValue);
      props.onBlur?.(event);
    },
    [props, value],
  );

  const handleFocus = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      // 在input允许输入时，用户聚焦input，清空输入框
      if (!props.inputReadOnly) {
        setInputValue("");
      }
      props.onFocus?.(event);
    },
    [props],
  );

  // 同步外部 value
  useEffect(() => {
    setValue(props.value ?? 0);
    setInputValue((props.value ?? 0).toString());
  }, [props.value]);

  return (
    <div
      style={assignInlineVars({
        [styles.flexDirection]: flexDirection,
      })}
      className={classnames(styles.counterWrap, props.className)}
    >
      <MinusOutlined
        style={{ color: "#fff", ...props.iconStyle }}
        className={classnames(props.iconClassName, styles.icon, {
          [classnames(styles.disabled)]: minusDisabled,
        })}
        onClick={handleMinus}
      />
      <input
        type="number"
        value={inputValue}
        min={minValue}
        max={maxValue}
        autoFocus={props.autofocus}
        readOnly={props.inputReadOnly}
        disabled={props.disabled}
        style={props.inputStyle}
        className={classnames(props.inputClassName, styles.input, {
          [classnames(styles.inputDisabled)]: props.disabled,
        })}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleInput}
      />
      <PlusOutlined
        style={{ color: "#fff", ...props.iconStyle }}
        className={classnames(props.iconClassName, styles.icon, {
          [classnames(styles.disabled)]: plusDisabled,
        })}
        onClick={handlePlus}
      />
    </div>
  );
};

export default Counter;
