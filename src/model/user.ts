export interface LoginResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
}

export interface DecodedToken {
  sub: string;
  role: string;
}
