export interface cssReturnProps {
  success: boolean;
  msg: string;
  type: 'normal' | 'warning' | 'error';
  code?: string
}