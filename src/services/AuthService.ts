import { User, UserAttribute } from '../models/User'

export class AuthService {
  public async login(
    userName: string,
    password: string
  ): Promise<User | undefined> {
    if (userName === 'user' && password === '1234') {
      return {
        userName: userName,
        email: 'some@email.com'
      }
    } else {
      return undefined
    }
  }

  public async getUserAttributes(user: User): Promise<UserAttribute[]> {
    const result: UserAttribute[] = []

    result.push({
      name: 'description',
      value: 'Best user ever!'
    })
    result.push({
      name: 'job',
      value: 'Engineer'
    })
    result.push({
      name: 'age',
      value: '25'
    })
    result.push({
      name: 'experience',
      value: '3 years'
    })

    return result
  }
}
