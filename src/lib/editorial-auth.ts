export const editorialRoles = ['owner', 'editor', 'reviewer'] as const;

export type EditorialRole = (typeof editorialRoles)[number];
export type EditorialPermission =
  | 'read'
  | 'create'
  | 'edit'
  | 'submitReview'
  | 'approveReview'
  | 'publish'
  | 'restore'
  | 'archive'
  | 'manageMedia';

const permissions: Record<EditorialRole, readonly EditorialPermission[]> = {
  owner: [
    'read',
    'create',
    'edit',
    'submitReview',
    'approveReview',
    'publish',
    'restore',
    'archive',
    'manageMedia',
  ],
  editor: ['read', 'create', 'edit', 'submitReview', 'manageMedia'],
  reviewer: ['read', 'approveReview'],
};

export function isEditorialRole(value: unknown): value is EditorialRole {
  return typeof value === 'string' && editorialRoles.includes(value as EditorialRole);
}

export function can(role: EditorialRole, permission: EditorialPermission) {
  return permissions[role].includes(permission);
}
