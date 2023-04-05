# @gthrm/deep-diff

`@gthrm/deep-diff` is a TypeScript utility library that helps you compare two entities and return an entity that contains only the changed keys of the second entity. This library is especially useful for comparing nested objects and arrays and works well with mixed data structures.

## Installation

To install this library, run the following command:

```bash
npm install @gthrm/deep-diff
```

## Usage

First, import the getDeepDifference function:

```typescript
import { getDeepDifference } from "@gthrm/deep-diff";
```

Then, use the getDeepDifference function to compare two entities:

```typescript
const prevEntity = { a: 1, b: { c: 2, d: 3 } };
const newEntity = { a: 1, b: { c: 2, d: 4 } };

const result = getDeepDifference(prevEntity, newEntity);
console.log(result); // { b: { d: 4 } }
```

## Contributing

Feel free to submit issues and pull requests if you encounter any problems or have suggestions for improvements. We appreciate your contributions to make this library better!

## License

This library is released under the [MIT License](./LICENSE).
