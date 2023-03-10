const bcrypt = require('bcrypt')

export const getHashFromPassword = (password: string): Promise<string> =>
    bcrypt.hash(password, 10)

export const comparePasswords = (password: string, hash: string): Promise<boolean> =>
    bcrypt.compare(password, hash)


