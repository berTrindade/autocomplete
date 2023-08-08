import { fireEvent, screen } from '@testing-library/react'

describe('Autocomplete', () => {
  // const setup = () => {
  //   return render(
  //     <Autocomplete />,
  //   )
  // }

  test.skip('if search feature is returning a suggestion', async () => {
    const nameInputEl = screen.getByPlaceholderText('Type to search')

    fireEvent.change(nameInputEl, {
      target: { value: 'Bernard' },
    })
    expect(screen.queryByText('Bernard Ondricka')).not.toBeInTheDocument()
  })
})
