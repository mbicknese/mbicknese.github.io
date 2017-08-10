'use strict'

import strategy from '@/router/DateTitleStrategy'

describe('DateTitleStategy', () => {
  it('can turn URLs to filenames', () => {
    const result = strategy.urlToFilename('2017/04/01/a-testing-title')
    expect(result).to.equal('2017-04-01-a testing title.md')
  })
  it('can turn filenames to URLs', () => {
    const result = strategy.filenameToUrl('2017-04-01-a testing title.md')
    expect(result).to.equal('2017/04/01/a-testing-title')
  })
})
