export default interface LoginResponse {
  userData?: { email: string; telegram?: string };
  error?: string;
}
