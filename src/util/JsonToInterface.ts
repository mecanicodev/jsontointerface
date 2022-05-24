
import pluralize from "pluralize";


type JsonValidType = string | number | boolean | null | JsonValidType[] | JsonObject;
type JsonObject = { [key: string]: JsonValidType }
type Entry = [JsonObject, string]

export default function jsonToInterface(jsonSchema: string, name: string = 'name'): string {

  let objSchema: JsonObject;

  try {
    objSchema = JSON.parse(jsonSchema)
  } catch (error) {
    return '' // invalid JSON
  }

  const map = deepMapObjects(objSchema, name);

  const makeInterface = (obj: JsonObject, iFaceName: string): string => {
    let props: string = '';

    for (let key in obj) {
      let value: JsonValidType = obj[key];
      let type: string;
      if (Array.isArray(value)) {
        if (value.every(item => typeof item === 'object' && !Array.isArray(item))) {
          type = capitalize(map.get(value[0] as JsonObject) as string) + '[]';
        } else {
          type = getType(value);
        }
      } else if (typeof obj[key] === 'object') {
          type = capitalize(map.get(value as JsonObject) as string)
      } else {
          type = getType(value)
      }
      props += `  ${key}: ${type}\n`;
    }
    return `interface ${capitalize(iFaceName)} {\n${props}}`
  }

  const set = new Set<string>()

  for (let [iFace, iFaceName] of map) {
    set.add(makeInterface(iFace, iFaceName))
  }
  return Array.from(set).join('\n\n')
}

function deepMapObjects(obj: JsonObject, name: string = 'name' ): Map<JsonObject, string> {

  let entries: Entry[] = [[obj, name]]

  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      let isArrayOfObjects: boolean = value.every(item => typeof item === 'object' && !Array.isArray(item))
      if (isArrayOfObjects) {
        let objName: string = pluralize.singular(key)
        entries = entries.concat([...deepMapObjects(value[0] as JsonObject, objName)])
      } 
    } else if (typeof value === 'object') {
        entries = entries.concat([...deepMapObjects(value as JsonObject, key)])
    }
     
  }

  return new Map(entries);
}

function getType(value: JsonValidType): string {
  let type: string;
  if (value === null) {
    type = 'null';
  } else if (Array.isArray(value)) {
    type = getArrayTypes(value);
  } else {
    type = typeof value;
  }
  return type;
}

function getArrayTypes(arr: Array<JsonValidType>): string {
  let set = new Set<string>()
  arr.forEach(i => set.add(getType(i)))
  
  if (set.size === 0) {
    return 'any[]'
  } else if (set.size === 1) {
      let [type] = set
      return type + '[]'
  } else {
      let types: string = Array.from(set).join(' | ')
      return `Array<${types ? types : 'any'}>`
  }
}

function capitalize(str: string) {
  const start: string = str.charAt(0).toLocaleUpperCase()
  const end: string = str.length > 1 ? str.slice(1) : ''; 
  return  start + end;
}
