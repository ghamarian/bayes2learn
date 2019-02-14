main -> NEWLINE | simple_stmt 
simple_stmt -> expr_stmt (";" expr_stmt):* ";":? NEWLINE
expr_stmt -> testlist_star_expr (annassign | augassign testlist | ("=" testlist_star_expr):*)
annassign -> ":" test ("=" test):?
testlist_star_expr -> (test|star_expr) ("," (test|star_expr)):* ",":?
augassign -> ("+=" | "-=" | "*=" | "@=" | "/=" | "%=" | "&=" | "|=" | "^=" |
            "<<=" | ">>=" | "**=" | "//=")

test -> or_test ("if" or_test "else" test):?
test_nocond -> or_test 
or_test -> and_test ("or" and_test):*
and_test -> not_test ("and" not_test):*
not_test -> "not" not_test | comparison
comparison -> expr (comp_op expr):*
comp_op -> "<"|">"|"=="|">="|"<="|"<>"|"!="|"in"|"not" "in"|"is"|"is" "not"
star_expr -> "*" expr
expr -> xor_expr ("|" xor_expr):*
xor_expr -> and_expr ("^" and_expr):*
and_expr -> shift_expr ("&" shift_expr):*
shift_expr -> arith_expr (("<<"|">>") arith_expr):*
arith_expr -> term (("+"|"-") term):*
term -> factor (("*"|"@"|"/"|"%"|"//") factor):*
factor -> ("+"|"-"|"~") factor | power
power -> atom_expr ("**" factor):?
atom_expr -> ("await"):? atom trailer:*
atom -> ( "[" testlist_comp:? "]" |
       NAME | NUMBER | STRING+ | "..." | "None" | "True" | "False")

testlist_comp -> (test|star_expr) ( comp_for | ("," (test|star_expr)):* ",":? )
trailer -> "(" arglist:? ")" | "[" subscriptlist "]" | "." NAME
subscriptlist -> subscript ("," subscript):* ",":?
subscript -> test | test:? ":" test:? sliceop:?
sliceop -> ":" test:?
exprlist -> (expr|star_expr) ("," (expr|star_expr)):* ",":?
testlist -> test ("," test):* ",":?
arglist -> argument ("," argument):*  ",":?

argument -> ( test comp_for:? |
            test "=" test |
            "**" test |
            "*" test )

comp_iter -> comp_for | comp_if
sync_comp_for -> "for" exprlist "in" or_test comp_iter:?
comp_for -> "async":? sync_comp_for
comp_if -> "if" test_nocond comp_iter:?