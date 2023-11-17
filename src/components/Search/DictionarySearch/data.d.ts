import { EnumDictionaryCategory } from '@/constants/enum';

export interface DictionaryOption {
  id?: number;
  code?: string;
  typeName?: string;
  typeId?: number;
  cnName?: string;
  enName?: string;
  orderNo?: number;
  enumNo?: number;
  comment?: string;
}

export type DictionaryValueType = string[];

export interface DictionarySearchProps {
  placeholder?: string;
  value?: DictionaryValueType;
  onChange?: (val?: DictionaryValueType) => void;
  multiple?: boolean;
  style?: React.CSSProperties;
  category?: EnumDictionaryCategory;
  onDicChange?: (val: DictionaryValueType, option?: DictionaryOption | DictionaryOption[]) => void;
  readonly?: boolean;
  filter?: (data: DictionaryOption[]) => DictionaryOption[];
  /**
   * 是否使用枚举值作为value，如为true,则表单值使用字典的enumNo作为值
   */
  useEnumNo?: boolean;
  title?: string;
}

export type DictionaryRefProps = {
  options: DictionaryOption[];
  selectedOption: DictionaryOption | DictionaryOption[];
};
