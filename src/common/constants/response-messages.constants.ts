export const UserMessages = {
  USER_CREATED: 'User created successfully',
  USER_ALREADY_EXISTS: (field: string) =>
    `User with this ${field} already exists`,
  USER_NOT_FOUND: (id: number) => `User with ID ${id} not found`,
  EMAIL_USER_NOT_FOUND: (email: string) => `User with Email ${email} not found`,
  PHONE_USER_NOT_FOUND: (tel: number) => `User with tel ${tel} not found`,
};
