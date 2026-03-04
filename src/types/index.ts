export type CategorySlug = 'sport' | 'vzdelavani' | 'projektove-dny' | 'akce-a-pobyty';

export type MonthKey =
  | 'sep' | 'oct' | 'nov' | 'dec'
  | 'jan' | 'feb' | 'mar' | 'apr'
  | 'may' | 'jun' | 'jul' | 'aug';

export interface Program {
  id: string;
  title: string;
  emoji: string;
  category: CategorySlug;
  description: string;
  ageRange: string;
  duration: string;
  instructors: string;
}
