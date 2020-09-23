export default interface TaskStatus {
  id: number;
  code: string;
  description: string;
  hasEnded?: boolean;
}
