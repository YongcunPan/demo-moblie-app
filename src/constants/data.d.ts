export type ColumnType =
  | 'text'
  | 'textarea'
  | 'checkbox'
  | 'picker'
  | 'date'
  | 'datetime'
  | 'daterange'
  | 'time'
  | 'year'
  | 'month'
  | 'week'
  | 'quarter'
  | 'radio'
  | 'number'
  | 'market'
  | 'brand'
  | 'dictionary'
  | 'switch'
  | 'custom'
  | 'stepper';

export type Option = {
  label: string;
  value: number | string;
};

/**
 * 钉钉企业ID
 */
export const DingTalkCorpId = 'ding9d400db96b57497b35c2f4657eb6378f';
