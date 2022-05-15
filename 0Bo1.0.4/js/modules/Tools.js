export default function HexToBABYLONColor3(hex) {

    var r = HexToR(hex) / 255;
    var g = HexToG(hex) / 255;
    var b = HexToB(hex) / 255;

    return new BABYLON.Color3(r, g, b);
}
function HexToR(h) { return parseInt((CutHex(h)).substring(0, 2), 16) }
function HexToG(h) { return parseInt((CutHex(h)).substring(2, 4), 16) }
function HexToB(h) { return parseInt((CutHex(h)).substring(4, 6), 16) }
function CutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }
