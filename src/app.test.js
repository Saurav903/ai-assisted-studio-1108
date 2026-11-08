import { describe, expect, it } from 'vitest'
import { generateBoard } from './main.jsx'

describe('generateBoard', () => {
  it('produces three routes for a project', () => {
    const board = generateBoard({ id: 'ripple' }, { energy: 'Calm', lens: 'Human', form: 'Film world' }, 'Make an ordinary weekday feel luminous.')
    expect(board.directions).toHaveLength(3)
    expect(board.directions[0].tone).toBe('Calm / Human')
    expect(board.thought).toContain('ordinary weekday')
  })

  it('falls back to a workable demo board', () => {
    const board = generateBoard({ id: 'unknown' }, { energy: 'Electric', lens: 'Cultural', form: 'Campaign' })
    expect(board.title).toBeTruthy()
  })
})
