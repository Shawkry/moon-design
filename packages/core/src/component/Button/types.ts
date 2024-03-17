export interface IButtonProps {
  /**
   * 是否填充
   * @default true
   */
  primary?: boolean;
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * 大小
   * @default large
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 状态
   * @default normal
   */
  status?: 'normal' | 'success' | 'warning' | 'error';
  /**
   * 内容文本
   */
  label: string;
  /**
   * onClick点击事件
   */
  onClick?: () => void;
}
