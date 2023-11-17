import { restCode } from '@/constants/rest';
import { MarketOption } from '@/models/global';
import { getUserMarket } from '@/models/user';
import { queryUserMarkets } from '@/services/common';
import { Picker, Selector, Space } from 'antd-mobile';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { getDvaApp } from 'umi';
import { MarketRefProps, MarketSearchProps } from './data';

const dva = getDvaApp();
/**
 * 市场查询
 */
const MarketSearch: React.ForwardRefRenderFunction<MarketRefProps, MarketSearchProps> = (props, ref) => {
  const {
    multiple,
    value,
    userId,
    isValueSplit,
    style,
    readonly,
    all,
    placeholder,
    functionCode,
    onChange,
    onMarketChange,
    initCallback,
  } = props;

  const [tempValue, setTempValue] = useState<any>();
  const [options, setOptions] = useState<MarketOption[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const selectedItems: MarketOption[] = useMemo(() => {
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
    const allMarkets = dva._store.getState()?.global?.allMarkets;
    if (userId) {
      setLoading(true);
      queryUserMarkets(userId).then((res) => {
        setLoading(false);
        if (res.code === restCode.success) {
          setOptions(res.data);
        } else {
          setOptions([]);
        }
      });
    } else if (all) {
      // 获取所有市场
      setOptions(allMarkets);
    } else {
      // 获取当前用户的市场
      const markets = getUserMarket(functionCode);
      setOptions(markets);
    }
    if (initCallback) initCallback(value);
  }, [userId, all, dva._store.getState()?.global.allMarkets, dva._store.getState()?.user]);

  useEffect(() => {
    // 设置值
    if (value) {
      if (isValueSplit && typeof value === 'string' && value.length > 0) {
        setTempValue(value.split(','));
      } else {
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
    if (onMarketChange && options) {
      let item;
      if (multiple) {
        item = options.filter((opt) => val.indexOf(opt.id) > -1);
      } else {
        item = options.find((d) => d.id === val);
      }
      onMarketChange(val, item);
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
            label: opt.marketName,
            value: `${opt.id}`,
          }))
        : [
            options.map((opt) => ({
              key: opt.id,
              label: opt.marketName,
              value: `${opt.id}`,
            })),
          ];
    }
    return [];
  }, [options, multiple]);

  if (readonly) {
    return (
      <Space>
        {selectedItems.map((item) => (
          <span key={item.id}>{item.marketName}</span>
        ))}
      </Space>
    );
  }
  if (multiple) {
    return <Selector options={columns} value={tempValue} multiple={true} onChange={(val) => handleChange(val)} />;
  }

  return (
    <Picker
      title="市场选择"
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

export default memo(forwardRef(MarketSearch));
