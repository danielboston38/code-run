import { test, expect } from 'claude-code/testing'
import { progress } from './register'

test('shows the count and ROM, never the answer or the key', () => {
  const log = '== apple2-deadtest\n  [7/23  30%  ~6m left] apple2-deadtest $FE6F model_name_one    ref: ref_key_one\n' +
    '  [8/23  35%  ~6m left] apple2-deadtest $FE8A model_name_two    ref: ref_key_two\n'
  const shown = progress('rep-plain', log)
  expect(shown).toBe('rep-plain · apple2-deadtest 8/23 ~6m left')
  expect(shown).not.toContain('model_name_two')
  expect(shown).not.toContain('ref_key_two')
})

test('nothing to show before the first progress line', () => {
  expect(progress('rep-ft', '== oric-atmos\n')).toBeUndefined()
})
