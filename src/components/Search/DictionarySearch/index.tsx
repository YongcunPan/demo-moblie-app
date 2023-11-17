import { restCode } from '@/constants/rest';
import { queryDictionaryByCategory } from '@/services/common';
import { Picker, Selector, Space } from 'antd-mobile';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { DictionaryOption, DictionaryRefProps, DictionarySearchProps } from './data';

const DictionarySearch: React.ForwardRefRenderFunction<DictionaryRefProps, DictionarySearchProps> = (props, ref) => {
  const { title, placeholder, value, multiple, style, readonly, category, useEnumNo, onChange, onDicChange, filter } =
    props;
  const [options, setOptions] = useState<DictionaryOption[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const selectedItems: DictionaryOption[] = useMemo(() => {
    if (options && readonly && value) {
      return options.filter((opt) => value.indexOf(`${useEnumNo ? opt.enumNo : opt.id}`) > -1);
    }
    return [];
  }, [options, readonly, value]);

  useImperativeHandle(
    ref,
    () => ({
      options: options || [],
      selectedOption: selectedItems,
    }),
    [options, value]
  );

  useEffect(() => {
    setLoading(true);
    queryDictionaryByCategory(category || 0).then((res) => {
      setLoading(false);
      if (res.code === restCode.success) {
        setOptions(res.data);
      } else {
        setOptions([]);
      }
    });
  }, [category]);

  const filterOptions: any[] = useMemo(() => {
    let list;
    if (options && filter) {
      list = filter(options);
    }
    list = options || [];
    return multiple
      ? list?.map((opt) => ({
          label: opt.cnName,
          value: `${useEnumNo ? opt.enumNo : opt.id}`,
        }))
      : [
          list?.map((opt) => ({
            key: opt.id,
            label: opt.cnName,
            value: `${useEnumNo ? opt.enumNo : opt.id}`,
          })),
        ];
  }, [options, filter]);

  const handleChange = (val: any) => {
    onChange?.(val);
    const opts = options?.filter((opt) => val.indexOf(`${useEnumNo ? opt.enumNo : opt.id}`) > -1);
    onDicChange?.(val, opts);
  };

  if (readonly) {
    return <Space>{selectedItems && selectedItems.map((r) => <span key={r.id}>{r.cnName}</span>)}</Space>;
  }
  if (multiple) {
    <Selector options={filterOptions} value={value} multiple={true} onChange={(val) => handleChange(val)} />;
  }

  return (
    <Picker
      title={title || '字典选择'}
      value={value}
      onConfirm={(val: any) => handleChange(val)}
      loading={loading}
      style={style}
      columns={filterOptions}
    >
      {(items, action) => {
        return items.every((item) => item === null) ? (
          readonly ? (
            '请选择'
          ) : (
            <div onClick={action.open}>{placeholder || '请选择'}</div>
          )
        ) : (
          items.map((item) => item?.label ?? '请选择')
        );
      }}
    </Picker>
  );
};

export default memo(forwardRef(DictionarySearch));
