# @azodik/schemas

A collection of Zod schemas for the Azodik platform.

## Installation

```bash
npm install @azodik/schemas
# or
pnpm add @azodik/schemas
# or
yarn add @azodik/schemas
```

## Usage

```typescript
import { userSchema, tenantSchema } from '@azodik/schemas';

// Use the schemas for validation
const userData = userSchema.parse({
  id: '123',
  email: 'user@example.com',
  name: 'John Doe'
});
```

## Development

This package uses [changesets](https://github.com/changesets/changesets) for versioning and publishing.

### Available Scripts

- `pnpm build` - Build the package
- `pnpm dev` - Build in watch mode
- `pnpm clean` - Clean the dist folder
- `pnpm changeset` - Create a new changeset
- `pnpm version` - Version packages based on changesets
- `pnpm publish:changeset` - Publish packages to npm

### Workflow

1. **Make changes** to your code
2. **Create a changeset**: `pnpm changeset`
   - Select the type of change (patch, minor, major)
   - Write a description of the changes
3. **Build the package**: `pnpm build`
4. **Version and publish**: 
   - `pnpm version` - This will update versions and create git tags
   - `pnpm publish:changeset` - This will publish to npm

### Using in Other Repositories

After publishing, you can use this package in other repositories:

```bash
npm install @azodik/schemas@latest
```

## License

MIT
