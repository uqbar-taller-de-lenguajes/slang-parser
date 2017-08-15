slang = term

term = boolean / conditional

boolean = true / false
true = 'true' { return 1 }
false = 'false' {}

conditional = 'if' condition: term 'then' consecuence: term otherwise: term? {}
