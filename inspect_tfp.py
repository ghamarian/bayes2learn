import inspect
import json
import tensorflow_probability as tfp
from tensorflow_probability.python.distributions import Distribution

distributions = {}
param_set = set()
from pprint import pprint


def _all_subclasses(cls):
    return cls.__subclasses__() + [g for s in cls.__subclasses__()
                                   for g in _all_subclasses(s)]


subclasses = _all_subclasses(Distribution)

pprint([sbc.__name__ for sbc in subclasses])

for subclass in subclasses:
    sig = inspect.signature(subclass.__init__)
    name_class = subclass.__name__
    if name_class[0] != '_':
        distributions[name_class] = {}
        for k, v in sig.parameters.items():
            t = type(v.default).__name__

            if k in 'self':
                continue

            if t == 'type':
                distributions[name_class][k] = {"type": 'unknown', "value": 'unknown_value'}
            elif t == 'function':
                (tname, dvalue) = ('function', '')
            elif t == 'DType':
                distributions[name_class][k] = {"type": t, "value": repr(v.default), "options": []}
            elif isinstance(v.default, float):
                distributions[name_class][k] = {"type": t, "value": v.default}
            elif isinstance(v.default, str):
                distributions[name_class][k] = {"type": t, "value": v.default, "options": []}
            elif isinstance(v.default, bool):
                distributions[name_class][k] = {"type": t, "value": v.default, "options": ['True', 'False']}
            else:
                distributions[name_class][k] = {"type": t, "value": v.default, "options": []}

        # distributions[name_class]['class_name'] = name_class

json_data = json.dumps(distributions)
pprint(distributions)
# pprint(len(param_set))

# del distributions['Network']

print(distributions)
with open('keraslayers', 'w') as fp:
    json.dump(distributions, fp)

# params_string = {}
# params_none = {}
# params_bool = {}
# params_empty = {}
# params_float= {}
# params_int= {}
# for subclass in subclasses:
#     sig = inspect.signature(subclass.__init__)
#     name_class = subclass.__name__
#
#     core_layers[name_class] = {}
#
#     for k, v in sig.parameters.items():
#         if v.default == None:
#             params_none[k] = ""
#
#         else:
#             if isinstance(v.default, float):
#                 params_float[k] = v.default
#             if isinstance(v.default, str):
#                 params_string[k] = v.default
#             if isinstance(v.default, bool):
#                 params_bool[k] = v.default
#             else:
#                 if k not in params_float and k not in params_string and k not in params_bool:
#                     params_empty[k] = ''
#
# del params_empty['self']
# del params_empty['args']
# del params_empty['kwargs']
#
#
# print('string ' + str(len(params_string.keys())))
# print(params_string)
# print('none ' + str(len(params_none.keys())))
# print(params_none.keys())
# print('empty ' + str(len(params_empty.keys())))
# print(params_empty.keys())
# print('bool ' + str(len(params_bool.keys())))
# print(params_bool)
# print('float ' + str(len(params_float.keys())))
# print(params_float)
#
# # print(core_layers)
