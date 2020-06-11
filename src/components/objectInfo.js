// TYPES
export const SINGLE_DOOR = 'SINGLE_DOOR';

// GET OBJECT SIZES
// Returns object size in inches
export const getObjectSize = (type) => {
  switch (type) {
    case SINGLE_DOOR:
      return 32;
  }
}