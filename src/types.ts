export interface NewAppError extends Error {
  message: string;
  statusCode: number;
  status: string;
  isOperational?: boolean;
  code?: string | number;
  name: string;
  details?: any;
  path?: string;
  value?: any;
}
