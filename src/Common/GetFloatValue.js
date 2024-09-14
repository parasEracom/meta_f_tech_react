export default function GetFloatValue (value,decimal = 4) {
    return parseFloat(value).toFixed(decimal);
}