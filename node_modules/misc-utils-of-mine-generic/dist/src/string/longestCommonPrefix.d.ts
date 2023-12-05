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
export declare function longestCommonPrefix(array: string[]): string;
