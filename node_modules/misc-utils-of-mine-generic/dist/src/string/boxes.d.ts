export declare enum BorderStyle {
    light = "light",
    'double' = "double",
    'round' = "round",
    'heavy' = "heavy",
    lightDouble = "lightDouble",
    doubleLight = "doubleLight",
    'classic' = "classic",
    lightTripleDash = "lightTripleDash",
    lightQuadrupleDash = "lightQuadrupleDash",
    lightDoubleDash = "lightDoubleDash",
    heavier = "heavier",
    roundDoubleDash = "roundDoubleDash",
    roundTripleDash = "roundTripleDash",
    roundQuadrupleDash = "roundQuadrupleDash",
    heavyDoubleDash = "heavyDoubleDash",
    heavyTripleDash = "heavyTripleDash",
    heavyQuadrupleDash = "heavyQuadrupleDash",
    singleRareCorners = "singleRareCorners",
    triangleCorners = "triangleCorners"
}
export declare const borderStyles: string[];
export declare enum BorderSide {
    'topLeft' = "topLeft",
    'topRight' = "topRight",
    'bottomRight' = "bottomRight",
    'bottomLeft' = "bottomLeft",
    'left' = "left",
    'bottom' = "bottom",
    'top' = "top",
    right = "right"
}
export declare function getBoxChar(s: BorderStyle, si: BorderSide): string;
