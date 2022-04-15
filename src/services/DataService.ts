import { SpaceModel } from 'models/SpaceModel'

export class DataService {
  public async getSpaces(): Promise<SpaceModel[]> {
    const result: SpaceModel[] = []

    result.push({
      spaceId: '123',
      name: 'Best location',
      location: 'Paris'
    })
    result.push({
      spaceId: '124',
      name: 'Best location',
      location: 'Paris'
    })
    result.push({
      spaceId: '125',
      name: 'Best location',
      location: 'Paris'
    })

    return result
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId === '123') {
      return '5555'
    } else {
      return undefined
    }
  }
}
