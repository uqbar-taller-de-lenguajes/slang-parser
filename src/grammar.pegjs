{
  Object.prototype.put = function put(key, value) {
    return { ...this, [key]: value }
  }

  Object.prototype.safePut = function safePut(key, value) {
    return (value === undefined)? this : this.put(key, value)
  }

  let BaseNode = function BaseNode(type){
    return { type: type }
  }

  function booleanNode(value) {
    let boolean = value === 'true'
    return BaseNode('boolean').put('value', boolean)
  }

  function conditionalNode(condition, then, otherwise) {    
    return BaseNode('if')
      .put('condition', condition)
      .put('then', then)
      .safePut('otherwise', otherwise[3])
  }
}

slang = term

_ = __?
__ = [ \t\r\n]+

term = boolean / conditional

boolean = value:('true' / 'false') { return booleanNode(value) }

conditional = 'if' __ condition:(term) __ 'then' __ then:(term) otherwise:(__ 'else' __ term)? { return conditionalNode(condition, then, otherwise || []) }
