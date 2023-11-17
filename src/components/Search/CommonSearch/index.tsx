import { restCode } from '@/constants/rest';
import { Picker, Selector, Space } from 'antd-mobile';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { CommonOption, CommonRefProps, CommonSearchProps } from './data';

const CommonSearch: React.ForwardRefRenderFunction<CommonRefProps, CommonSearchProps> = (props, ref) => {
  const {
    placeholder,
    value,
    options,
    multiple,
    title,
    style,
    readonly,
    labelField,
    valueField,
    dataField,
    service,
    onChange,
    onItemChange,
  } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [tempOptions, setTempOptions] = useState<CommonOption[]>();

  const selectedItems: CommonOption[] = useMemo(() => {
    if (tempOptions && readonly && value) {
      return tempOptions.filter((opt) => value.indexOf(`${opt.id}`) > -1);
    }
    return [];
  }, [tempOptions, readonly, value]);

  const filterOptions: any[] = useMemo(() => {
    let list;
    if (service && tempOptions) {
      list = tempOptions;
    }
    list = options || [];
    return multiple ? list : [list];
  }, [tempOptions, options]);

  useImperativeHandle(
    ref,
    () => ({
      options: multiple ? filterOptions : filterOptions[0],
      selectedOption: selectedItems,
    }),
    [filterOptions, selectedItems]
  );

  useEffect(() => {
    if (service) {
      setLoading(true);
      service().then((res) => {
        setLoading(false);
        if (res.code === restCode.success) {
          const list = dataField ? res.data[`${dataField}`] : res.data;
          setTempOptions(
            list.map((i: any) => ({
              label: i[`${labelField}`],
              value: i[`${valueField}`],
            }))
          );
        } else {
          setTempOptions([]);
        }
      });
    }
  }, [service]);

  const handleChange = (val: any) => {
    onChange?.(val);
    onItemChange?.(val);
  };

  if (readonly) {
    return <Space>{selectedItems && selectedItems.map((r) => <span key={r.id}>{r.cnName}</span>)}</Space>;
  }
  if (multiple) {
    <Selector options={filterOptions} value={value} multiple={true} onChange={(val) => handleChange(val)} />;
  }

  return (
    <Picker
      title={title || '选择'}
      value={value}
      onConfirm={(val: any) => handleChange(val)}
      loading={loading}
      style={style}
      columns={[filterOptions]}
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

export default memo(forwardRef(CommonSearch));
