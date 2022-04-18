import { getByTestId } from '@testing-library/react'
import { render } from 'react-dom'
import { StaticRouter } from 'react-router-dom'
import { Navbar } from '../../src/components/Navbar'
import { User } from '../../src/models/User'

describe('Navbar test suite', () => {
  let container: HTMLDivElement

  const baseLink = 'http://localhost'

  const someUser: User = {
    email: 'someEmail',
    userName: 'someUserName'
  }

  afterEach(() => {
    document.body.removeChild(container)
    container.remove()
  })

  test('Renders correctly with user', () => {
    container = document.createElement('div')

    document.body.appendChild(container)

    render(
      <StaticRouter>
        <Navbar user={someUser} />
      </StaticRouter>,
      container
    )

    const links = document.querySelectorAll('a')

    expect(links[0].href).toBe(baseLink + '/')
    expect(links[1].href).toBe(baseLink + '/profile')
    expect(links[2].href).toBe(baseLink + '/spaces')
    expect(links[3].href).toBe(baseLink + '/logout')
  })

  test('Renders correctly with user using data-testid in (Navbar) component', () => {
    container = document.createElement('div')

    document.body.appendChild(container)

    render(
      <StaticRouter>
        <Navbar user={someUser} />
      </StaticRouter>,
      container
    )

    const homeLink = getByTestId(container, 'home-link') as HTMLAnchorElement
    expect(homeLink.href).toBe(baseLink + '/')

    const profileLink = getByTestId(
      container,
      'profile-link'
    ) as HTMLAnchorElement
    expect(profileLink.href).toBe(baseLink + '/profile')

    const spacesLink = getByTestId(
      container,
      'spaces-link'
    ) as HTMLAnchorElement
    expect(spacesLink.href).toBe(baseLink + '/spaces')
  })

  test('Renders correctly without user using data-testid in (Navbar) component', () => {
    container = document.createElement('div')

    document.body.appendChild(container)

    render(
      <StaticRouter>
        <Navbar user={undefined} />
      </StaticRouter>,
      container
    )

    const loginLink = getByTestId(container, 'login-link') as HTMLAnchorElement
    expect(loginLink.href).toBe(baseLink + '/login')
  })
})
