import { describe, it } from 'mocha'

import { expect } from 'chai'
import parse from '../src/parser'

describe('parser', () => {
  describe('example', () => {
    it('parses when it should', () => {
      expect(parse('true')).to.equal(1)
    })

    it('fails when it should', () => {
      expect(() => parse('abc')).to.throw()
    })

  })

})
