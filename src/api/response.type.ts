export interface ResponseREST {
  success: boolean;
  message: string;
  messageData?: string;
  messageDescription?: string;
  status?: string | number;
}
