export default function isEmptyObject(object) {
    if (!object) return true;

    return typeof object === 'string' 
        ? Object.values(JSON.parse(object)).length === 0
        : Object.values(object).length === 0
}