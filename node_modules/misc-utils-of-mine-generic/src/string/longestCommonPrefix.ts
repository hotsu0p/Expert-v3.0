/**
 * Example: 
```
sharedStart(['interspecies', 'interstelar', 'interstate'])  //=> 'inters'
sharedStart(['throne', 'throne'])                           //=> 'throne'
sharedStart(['throne', 'dungeon'])                          //=> ''
sharedStart(['cheese'])                                     //=> 'cheese'
sharedStart([])                                             //=> ''
sharedStart(['prefix', 'suffix'])                           //=> ''
``` 
*/
export function longestCommonPrefix(array: string[]) {
  var A = array.concat().sort(),
    a1 = A[0],
    a2 = A[A.length - 1],
    L = a1.length,
    i = 0
  while (i < L && a1.charAt(i) === a2.charAt(i)) i++
  return a1.substring(0, i)
}
