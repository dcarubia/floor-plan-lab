// ---------------- TYPES -----------------

// Doors:
export const SINGLE_DOOR = 'SINGLE_DOOR';
export const DOUBLE_DOOR = 'DOUBLE_DOOR';
export const SLIDING_DOOR = 'SLIDING_DOOR';
export const POCKET_DOOR = 'POCKET_DOOR';
export const BIFOLD_DOOR = 'BIFOLD_DOOR';
// Windows:

// ----------- GET OBJECT SIZES ---------------

// Returns object size in inches
export const getObjectSize = (type) => {
  switch (type) {
    case SINGLE_DOOR:
      return { w: 32, h: 32 };
    case DOUBLE_DOOR:
      return { w: 64, h: 32 };
    case SLIDING_DOOR:
    case POCKET_DOOR:
      return { w: 64, h: 6 };
    case BIFOLD_DOOR:
      return { w: 60, h: 18 };
  }
}