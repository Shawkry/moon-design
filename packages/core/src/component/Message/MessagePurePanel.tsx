import React, { CSSProperties, MouseEvent, useCallback, useMemo } from "react";
import classNames from "classnames";
import { Notice } from "rc-notification";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  ANIMATION_INIT_OFFSET,
  DEFAULT_ANIMATION_DURATION,
  messageIconInfo,
} from "./lib/constants";
import type { IMessagePurePanelProps } from "./types";
import * as styles from "./styles/message.css";

export const MessagePurePanel: React.FC<IMessagePurePanelProps> = React.memo(
  (props) => {
    const animationFadeOutDelayValue = useMemo(() => {
      return `${props.duration - DEFAULT_ANIMATION_DURATION}s`;
    }, [props.duration]);

    const getStyles = useMemo(() => {
      const newStyles: CSSProperties = {
        ...props.style,
        ...assignInlineVars({
          [styles.animationFadeOutDelay]: animationFadeOutDelayValue,
        }),
      };

      if (props.animationDirection) {
        newStyles.transform = `translateY(${ANIMATION_INIT_OFFSET[props.animationDirection]})`;
      }

      return newStyles;
    }, [animationFadeOutDelayValue, props.animationDirection, props.style]);

    const messageIcon = useMemo(() => {
      if (props.icon) return props.icon;

      return <div>{messageIconInfo[props.type]}</div>;
    }, [props.icon, props.type]);

    const pureContent = useMemo(() => {
      return (
        <div
          style={getStyles}
          className={classNames(styles.messageItem, props.className)}
        >
          {messageIcon}
          {props.content}
        </div>
      );
    }, [getStyles, messageIcon, props.className, props.content]);

    const handleClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        props.onClick?.(e);
        e.stopPropagation();
      },
      [props],
    );

    const handleClose = useCallback(
      (key: React.Key) => {
        props.onClose?.(key);
      },
      [props],
    );

    return (
      <Notice
        eventKey={props.eventKey}
        prefixCls={props.prefixCls}
        duration={props.duration}
        content={pureContent}
        onClick={handleClick}
        onNoticeClose={handleClose}
      />
    );
  },
);

MessagePurePanel.displayName = "MessagePurePanel";
