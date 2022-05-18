// export {}

// const interfaces: Object[] = []


function objectToInterfaces(jsonSchema: string, name: string): string {
  let objSchema: Object;
  try {
    objSchema = JSON.parse(jsonSchema)
  } catch (error) {
    console.error(error)
    return ''
  }

  
  let props: string= '';
  for (let key in objSchema) {
    let value: unknown = objSchema[key as keyof Object];
    props += `${key}: ${getType(key, value)}\n`
    
  }

  return `interface {\n${props}}`;
}

function getType(key: string, value: unknown): string {
  let type: string;

  if (Array.isArray(value)) {
    type = 'Array<>'
  } else if (typeof value === 'object') {
    type = capitalize(key)
  } else {
    type = typeof value
  }
    
    console.log(type)
    return type;
}
function capitalize(str: string) {
  const start: string = str.charAt(0).toLocaleUpperCase()
  const end: string = str.length > 1 ? str.slice(1) : ''; 
  return  start + end;
}
// getType('category', { name: 'some name'})

const testJson = require('./test.js')

console.log(objectToInterfaces(testJson, 'Category'));

export {};