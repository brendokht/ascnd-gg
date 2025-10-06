export const USERNAME_MIN_LENGTH: number = 3;
export const USERNAME_MAX_LENGTH: number = 30;

export const USERNAME_REGEX: RegExp = /^(?=.*[A-Za-z])[A-Za-z0-9._-]+$/;
export const DISPLAY_USERNAME_REGEX: RegExp = /^(?=.*[A-Za-z])[A-Za-z0-9._-]+$/;

export const NAME_MIN_LENGTH: number = 1;
export const NAME_MAX_LENGTH: number = 75;

export const NAME_REGEX: RegExp = /^(?=.*\p{L})[\p{L}\p{M}\p{Zs}''.-]{1,100}$/u;
