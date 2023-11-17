import { restCode } from '@/constants/rest';
import { BrandOption } from '@/models/global';
import { getUserBrand } from '@/models/user';
import { queryUserBrands } from '@/services/common';
import { Picker, Selector, Space } from 'antd-mobile';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { getDvaApp } from 'umi';
import { BrandRefProps, BrandSearchProps } from './data';

const dva = getDvaApp();
/**
 * 品牌查询
 */
const BrandSearch: React.ForwardRefRenderFunction<BrandRefProps, BrandSearchProps> = (props, ref) => {
  const {
    multiple,
    value,
    userId,
    isValueSplit,
    style,
    readonly,
    all,
    marketId,
    placeholder,
    functionCode,
    onChange,
    onBrandChange,
    initCallback,
  } = props;

  const [tempValue, setTempValue] = useState<any>();
  const [options, setOptions] = useState<BrandOption[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const selectedItems: BrandOption[] = useMemo(() => {
    if (options && readonly && tempValue) {
      return options.filter((opt) => tempValue.indexOf(opt.id) > -1);
    }
    return [];
  }, [options, readonly, tempValue]);

  /**
   * 给父组件使用
   */
  useImperativeHandle(
    ref,
    () => ({
      options: options || [],
      selectOption: selectedItems,
    }),
    [options, tempValue]
  );

  useEffect(() => {
    const allBrands = dva._store.getState()?.global?.allBrands;
    if (userId) {
      setLoading(true);
      queryUserBrands(userId).then((res) => {
        setLoading(false);
        if (res.code === restCode.success) {
          setOptions(res.data);
        } else {
          setOptions([]);
        }
      });
    } else if (all) {
      // 获取所有市场
      setOptions(allBrands);
    } else {
      const brands = getUserBrand(functionCode, marketId);
      setOptions(brands);
    }
    if (initCallback) initCallback(value);
  }, [userId, all, marketId, dva._store.getState()?.global.allBrands, dva._store.getState()?.user]);

  useEffect(() => {
    // 设置值
    if (value) {
      if (isValueSplit && typeof value === 'string' && value.length > 0) {
        setTempValue(value.split(','));
      } else if (typeof value === 'number' || typeof value === 'object') {
        setTempValue(value);
      }
    } else {
      setTempValue(undefined);
    }
  }, [value]);

  /**
   * 改变事件
   * @param val 选中值
   */
  const handleChange = (val: any) => {
    if (onBrandChange && options) {
      let item;
      if (multiple) {
        item = options.filter((opt) => val.indexOf(opt.id) > -1);
      } else {
        item = options.find((d) => d.id === val);
      }
      onBrandChange(val, item);
    }
    if (isValueSplit) {
      onChange?.(val.join(','));
    } else {
      onChange?.(val);
    }
  };

  const columns: any[] = useMemo(() => {
    if (options) {
      return multiple
        ? options.map((opt) => ({
            label: opt.cnName,
            value: `${opt.id}`,
          }))
        : [
            options.map((opt) => ({
              key: opt.id,
              label: opt.cnName,
              value: `${opt.id}`,
            })),
          ];
    }
    return [];
  }, [options, multiple]);

  if (multiple) {
    return readonly ? (
      <Space>
        {selectedItems.map((item) => (
          <span key={item.id}>{item.cnName}</span>
        ))}
      </Space>
    ) : (
      <Selector options={columns} value={tempValue} multiple={true} onChange={(val) => handleChange(val)} />
    );
  }

  return (
    <Picker
      title="品牌选择"
      value={tempValue}
      onConfirm={(val: any) => handleChange(val)}
      loading={loading}
      style={style}
      columns={columns}
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

export default memo(forwardRef(BrandSearch));
