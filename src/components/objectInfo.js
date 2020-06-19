// ---------------- TYPES -----------------
// Doors:
export const SINGLE_DOOR = 'SINGLE_DOOR';
export const DOUBLE_DOOR = 'DOUBLE_DOOR';
export const SLIDING_DOOR = 'SLIDING_DOOR';
export const POCKET_DOOR = 'POCKET_DOOR';
export const BIFOLD_DOOR = 'BIFOLD_DOOR';
// Windows:
export const WINDOW_32 = 'WINDOW_32';
export const WINDOW_48 = 'WINDOW_48';
export const WINDOW_60 = 'WINDOW_60';
// Kitchen:
export const COUNTER_MIDDLE = 'COUNTER_MIDDLE';
export const COUNTER_CORNER = 'COUNTER_CORNER';
export const COUNTER_END = 'COUNTER_END';
export const COOK_TOP = 'COOK_TOP';
export const DISHWASHER = 'DISHWASHER';
export const SINK = 'SINK';
export const DOUBLE_SINK = 'DOUBLE_SINK';
export const OVEN = 'OVEN';
export const REFRIGERATOR = 'REFRIGERATOR';
// Laundry:
export const WASHER = 'WASHER';
export const DRYER = 'DRYER';
// Bathroom:
export const BATH = 'BATH';
export const BR_SINK = 'BR_SINK';
export const TOILET = 'TOILET';
export const SHOWER_RECT = 'SHOWER_RECT';
export const SHOWER_SQUARE = 'SHOWER_SQUARE';
// Living Room:
export const CHAIR = 'CHAIR';
export const SOFA = 'SOFA';
export const COFFEE_TABLE = 'COFFEE_TABLE';


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
    case WINDOW_32:
      return { w: 32, h: 6 };
    case WINDOW_48:
      return { w: 48, h: 6 };
    case WINDOW_60:
      return { w: 60, h: 6 };
    case COUNTER_CORNER:
    case COUNTER_MIDDLE:
    case COUNTER_END:
    case COOK_TOP:
    case DISHWASHER:
    case REFRIGERATOR:
    case OVEN:
    case SINK:
      return { w: 24, h: 24 };
    case DOUBLE_SINK:
      return { w: 48, h: 24 };
    case WASHER:
    case DRYER:
      return { w: 27, h: 27 };
    case BATH:
      return { w: 60, h: 32 };
    case BR_SINK:
      return { w: 30, h: 20 };
    case SHOWER_RECT:
      return { w: 60, h: 32 };
    case SHOWER_SQUARE:
      return { w: 32, h: 32 };
    case TOILET:
      return { w: 20, h: 30 };
    case CHAIR:
      return { w: 35, h: 35 };
    case SOFA:
      return { w: 84, h: 34 };
    case COFFEE_TABLE:
      return { w: 40, h: 20 };
    default:
      return { w: 32, h: 32 };
  }
}