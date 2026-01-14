//TODO: Put this elsewhere
export const jwtConstants = {
  access_token_secret: 'yourAccessTokenSecretKey',
  refresh_token_secret: 'yourRefreshTokenSecretKey',
  access_token_expiry: '15m',
  refresh_token_expiry: '30d',

};

export const tokenInfo = {
  issuer: 'APP_ISSUER',
  audience: 'APP_AUDIENCE',
  access_token_expiry: '15m',
  refresh_token_expiry: '30d',
}

export const SKIP_AUTH = 'skipAuth';
export const TOKEN_NAME = 'access-token';
export const AUTH_OPTIONS = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'Bearer',
};
