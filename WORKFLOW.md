# Changeset Workflow Guide

This document explains how to use changesets for versioning and publishing the `@azodik/schemas` package.

## Prerequisites

- You must be logged in to npm: `npm login`
- You must have publish access to the `@azodik/schemas` package

## Daily Development Workflow

### 1. Making Changes

1. Make your code changes in the `src/` directory
2. Test your changes locally: `pnpm build`
3. Commit your changes to git

### 2. Creating a Changeset

When you're ready to release your changes:

```bash
pnpm changeset
```

This will:
- Ask you to select which packages have changed
- Ask you to select the type of change:
  - **patch**: Bug fixes, documentation updates (0.0.1 → 0.0.2)
  - **minor**: New features, backward compatible (0.0.1 → 0.1.0)
  - **major**: Breaking changes (0.0.1 → 1.0.0)
- Ask you to write a description of the changes

Example changeset description:
```
Add new user validation schema

- Added `userProfileSchema` for extended user profile validation
- Added `preferencesSchema` for user preferences
- Updated existing schemas to include new optional fields
```

### 3. Building and Testing

Before publishing, always build and test:

```bash
pnpm build
```

### 4. Versioning and Publishing

#### Option A: Manual Publishing (Recommended for development)

1. **Version the package**:
   ```bash
   pnpm version
   ```
   This will:
   - Update the version in `package.json`
   - Create a git tag
   - Update the changelog

2. **Publish to npm**:
   ```bash
   pnpm publish:changeset
   ```

#### Option B: Automated Publishing (For CI/CD)

```bash
pnpm version && pnpm publish:changeset
```

## Version Management

### Version Numbers

- **0.0.x**: Pre-release versions (patches)
- **0.x.0**: Minor releases (new features)
- **x.0.0**: Major releases (breaking changes)

### Changelog

The changelog is automatically generated in `CHANGELOG.md` when you run `pnpm version`.

## Using the Package in Other Repositories

After publishing, you can use the package in other repositories:

```bash
# Install latest version
npm install @azodik/schemas@latest

# Install specific version
npm install @azodik/schemas@0.1.0

# Update to latest
npm update @azodik/schemas
```

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Clean the build: `pnpm clean`
2. Reinstall dependencies: `pnpm install`
3. Rebuild: `pnpm build`

### Publishing Issues

If publishing fails:

1. Check if you're logged in: `npm whoami`
2. Verify package access: `npm access ls-packages`
3. Check for version conflicts
4. Ensure the package builds successfully

### Git Issues

If git operations fail:

1. Check git status: `git status`
2. Ensure you have the latest changes: `git pull`
3. Check if you have write access to the repository

## Best Practices

1. **Always create a changeset** before committing breaking changes
2. **Test your build** before publishing
3. **Use descriptive changeset messages** that explain what changed and why
4. **Keep changesets small and focused** - one logical change per changeset
5. **Review the generated changelog** before publishing
6. **Tag releases** in git for easy reference

## Example Workflow

Here's a complete example workflow:

```bash
# 1. Make changes to your code
# 2. Test locally
pnpm build

# 3. Create a changeset
pnpm changeset
# Select: patch, minor, or major
# Write description

# 4. Commit changes
git add .
git commit -m "feat: add new validation schemas"

# 5. Version and publish
pnpm version
pnpm publish:changeset

# 6. Push changes and tags
git push
git push --tags
```

## CI/CD Integration

For automated publishing, you can set up GitHub Actions or similar CI/CD tools to:

1. Run tests on pull requests
2. Build the package on merge to main
3. Automatically version and publish when changesets are present

This ensures consistent and reliable package publishing.
