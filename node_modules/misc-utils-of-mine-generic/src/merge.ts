/*!
 * @name JavaScript/NodeJS Merge v1.2.1
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge
 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */
import { typeOf } from './type'

/**
 * Merge two or more objects recursively.
 */
export function recursive(clone?: boolean) {
  //@ts-ignore
  return merge(clone === true, true, arguments)
}

/**
 * Clone the input removing any reference.
 */
export function clone(input: any) {
  var output = input,
    type = typeOf(input),
    index,
    size
  if (type === 'array') {
    output = []
    size = input.length
    for (index = 0; index < size; ++index) output[index] = clone(input[index])
  } else if (type === 'object') {
    output = {}
    for (index in input) output[index] = clone(input[index])
  }
  return output
}

/**
 * Merges two objects recursively.
 */
export function mergeRecursive(base: any, extend: any) {
  if (typeOf(base) !== 'object') return extend
  for (var key in extend) {
    if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {
      base[key] = mergeRecursive(base[key], extend[key])
    } else {
      base[key] = extend[key]
    }
  }
  return base
}

/**
 * Mergestwo or more objects.
 */
export function merge(clone_: boolean, recursive: boolean, ...argv: any[]) {
  var result = argv[0],
    size = argv.length
  if (clone_ || typeOf(result) !== 'object') result = {}
  for (var index = 0; index < size; ++index) {
    var item = argv[index],
      type = typeOf(item)
    if (type !== 'object') continue
    for (var key in item) {
      if (key === '__proto__') continue
      var sitem = clone_ ? clone(item[key]) : item[key]
      if (recursive) {
        result[key] = mergeRecursive(result[key], sitem)
      } else {
        result[key] = sitem
      }
    }
  }
  return result
}
