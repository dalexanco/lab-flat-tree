const { assert } = require('chai')
const openItem = require('../')

const data = [
  { key: 'test-0', depth: 0 },
    { key: 'test-1', depth: 1 },
      { key: 'test-2', depth: 2 },
      { key: 'test-3', depth: 2 },
        { key: 'test-4', depth: 3 },
        { key: 'test-5', depth: 3 },
  { key: 'test-6', depth: 0 },
    { key: 'test-7', depth: 1 },
      { key: 'test-8', depth: 2 },
    { key: 'test-9', depth: 1 },
      { key: 'test-10', depth: 2 }, // tested
        { key: 'test-11', depth: 3 },
      { key: 'test-12', depth: 2 },
        { key: 'test-13', depth: 3 },
    { key: 'test-14', depth: 1 },
  { key: 'test-15', depth: 0 },
    { key: 'test-16', depth: 1 },
    { key: 'test-17', depth: 1 },
]

describe('openItem', () => {
  it('should handle openItem', () => {
    const expected = [
      'test-6',
      'test-7',
      'test-9',
      'test-10',
      'test-11',
      'test-12',
      'test-14',
    ]
    assert.sameMembers(openItem('test-10', data), expected)
  })

  it('should hanlde first item', () => {
    const expected = [
      'test-6',
      'test-7',
      'test-9',
      'test-14',
    ]
    assert.sameMembers(openItem('test-6', data), expected)
  })

  it('should hanlde last item', () => {
    const expected = [
      'test-15',
      'test-16',
      'test-17',
    ]
    assert.sameMembers(openItem('test-17', data), expected)
  })
})
