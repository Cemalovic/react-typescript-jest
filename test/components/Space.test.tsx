import { fireEvent } from '@testing-library/react'
import { FunctionComponentElement } from 'react'
import { render } from 'react-dom'
import { Space } from '../../src/components/space/Space'

describe('Space component test suite', () => {
  let container: HTMLDivElement
  const reserveSpaceMock = jest.fn()

  const cleanUpTests = () => {
    document.body.removeChild(container)
    container.remove()
    jest.clearAllMocks()
  }

  const setUpTests = (element: FunctionComponentElement<any>) => {
    container = document.createElement('div')
    document.body.appendChild(container)
    render(element, container)
  }

  describe('tests with photo URL', () => {
    beforeEach(() => {
      setUpTests(
        <Space
          location={'someLocation'}
          name={'someName'}
          reserveSpace={reserveSpaceMock}
          spaceId={'123'}
          photoUrl={'some.url'}
        />
      )
    })

    test('show image correctly', () => {
      const image = container.querySelector('img')
      expect(image!).toBeInTheDocument()
      expect(image!.src).toBe('http://localhost/some.url')
    })

    test('show labels correctly', () => {
      const labels = container.querySelectorAll('label')
      expect(labels[0]).toHaveTextContent('someName')
      expect(labels[1]).toHaveTextContent('123')
      expect(labels[2]).toHaveTextContent('someLocation')
    })

    test('reserve spaces button', () => {
      const button = container.querySelector('button')
      fireEvent.click(button!)
      expect(reserveSpaceMock).toBeCalledWith('123')
    })

    afterEach(() => {
      cleanUpTests()
    })
  })

  describe('tests without photo URL', () => {
    beforeEach(() => {
      setUpTests(
        <Space
          location={'someLocation'}
          name={'someName'}
          reserveSpace={reserveSpaceMock}
          spaceId={'123'}
        />
      )
    })

    test('show image correctly', () => {
      const image = container.querySelector('img')
      expect(image!).toBeInTheDocument()
      expect(image!.src).toBeFalsy()
    })

    afterEach(() => {
      cleanUpTests()
    })
  })
})
