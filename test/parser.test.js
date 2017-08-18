import { describe, it } from 'mocha'

import { expect } from 'chai'
import parse from '../src/parser'

describe('parser', () => {

  describe('booleans', () => {

    it('parses true into a boolean node', () => {
      expect(parse('true')).to.deep.equal({ type: 'boolean', value: true })
    })

    it('parses false into a boolean node', () => {
      expect(parse('false')).to.deep.equal({ type: 'boolean', value: false })
    })
  })

  describe('conditional', () => {

    describe('without else', () => {

      it('parses an if into an if node', () => {
        let trueNode = { type: 'boolean', value: true }
        expect(parse('if true then true')).to.deep.equal({ type: 'if', condition: trueNode, then: trueNode })
      })
    })

    describe('with else', () => {
      it('parses an if into an if node', () => {
        let trueNode = { type: 'boolean', value: true }
        let falseNode = { ...trueNode, value: false }
        expect(parse('if true then true else false')).to.deep.equal({ type: 'if', condition: trueNode, then: trueNode, otherwise: falseNode })
      })
    })

    it('handles if anidation', () => {
      let trueNode = { type: 'boolean', value: true }
      let falseNode = { ...trueNode, value: false }
      let insideIfNode = { type: 'if', condition: trueNode, then: trueNode }
      expect(parse('if if true then true then true else false')).to.deep.equal({ type: 'if', condition: insideIfNode, then: trueNode, otherwise: falseNode })
    })
  })

  it('fails when it should', () => {
    expect(() => parse('abc')).to.throw()
  })
})
