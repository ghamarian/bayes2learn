main ->  simple_stmt 
simple_stmt -> expr_stmt _ (";" _ expr_stmt):* _ ";":? {% id %}
expr_stmt -> testlist_star_expr _ (annassign | augassign testlist | ("=" _ testlist_star_expr):*) {% id %}
annassign -> ":"  _ test _ ("=" _ test):? {% id %}
testlist_star_expr -> (test|star_expr) _ ("," _ (test|star_expr)):* _ ",":? {% id %}
augassign -> ("+=" | "-=" | "*=" | "@=" | "/=" | "%=" | "&=" | "|=" | "^=" |
            "<<=" | ">>=" | "**=" | "//=") {% id %}

test -> or_test _ ("if" _  or_test _ "else" _ test):? {% id %}
test_nocond -> or_test {% id %}
or_test -> and_test _ ("or" _ and_test):* {% id %}
and_test -> not_test _ ("and" _ not_test):* {% id %}
not_test -> "not" _ not_test | comparison {% id %}
comparison -> expr _ (comp_op expr):* {% id %}
comp_op -> "<"|">"|"=="|">="|"<="|"<>"|"!="|"in"|"not" "in"|"is"|"is" "not" {% id %}
star_expr -> "*" _ expr {% id %}
expr -> xor_expr _ ("|" xor_expr):* {% id %}
xor_expr -> and_expr _ ("^" and_expr):* {% id %}
and_expr -> shift_expr _ ("&" shift_expr):* {% id %}
shift_expr -> arith_expr _ (("<<"|">>") _ arith_expr):* {% id %}
arith_expr -> term _ (("+"|"-") _ term):* {% id %}
term -> factor _ (("*"|"@"|"/"|"%"|"//") _ factor):* {% id %}
factor -> ("+"|"-"|"~") _ factor | power {% id %}
power -> atom_expr _ ("**" factor):? {% id %}
atom_expr -> ("await"):? _ atom _ trailer:* {% id %}
atom -> ( "[" _ testlist_comp:? _ "]" |
       name | number | string:+ | "..." | "None" | "True" | "False") {% id %}

testlist_comp -> (test|star_expr) _ ( comp_for | ("," _ (test|star_expr)):* _ ",":? ) {% id %}
trailer -> "(" _ arglist:? _ ")" | "[" _ subscriptlist _ "]" | "." _ name {% id %}
subscriptlist -> subscript _ ("," _ subscript):* _ ",":? {% id %}
subscript -> test | test:? _ ":" _ test:? _ sliceop:? {% id %}
sliceop -> ":" _ test:? {% id %}
exprlist -> (expr|star_expr) _ ("," _ (expr|star_expr)):* _ ",":? {% id %}
testlist -> test _ ("," test):* _ ",":? {% id %}
arglist -> argument _ ("," argument):* _ ",":? {% id %}

argument -> ( test _ comp_for:? 
              | test _ "="  _ test  
              | "**" _ test  
              | "*" _ test )  {% id %}

comp_iter -> comp_for | comp_if {% id %}
sync_comp_for -> "for" _ exprlist _ "in" _ or_test _ comp_iter:? {% id %}
comp_for -> "async":? _ sync_comp_for {% id %}
comp_if -> "if" _ test_nocond _ comp_iter:? {% id %}

number -> "-":? [0-9]:+ ("." [0-9]:+):? {% id %}
name -> [a-zA-Z_]:+ {% id %}
dqstring -> "\"" dstrchar:* "\"" {% id %}
dstrchar -> [^\\"\n] {% id %}
string -> dqstring {% id %}

# Whitespace: `_` is optional, `__` is mandatory.
_  -> wschar:* {% function(d) {return null;} %}
__ -> wschar:+ {% function(d) {return null;} %} 

wschar -> [ \t\n\v\f] {% id %}