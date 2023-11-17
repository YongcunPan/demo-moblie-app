import { dateFormat } from '@/utils/date';
import { Checkbox, DatePicker, DatePickerRef, Form, Input, Radio, Space, Stepper, Switch, TextArea } from 'antd-mobile';
import { forwardRef, ForwardRefRenderFunction, memo, RefObject, useEffect, useImperativeHandle, useMemo } from 'react';
import BrandSearch from '../Search/BrandSearch';
import CommonSearch from '../Search/CommonSearch';
import DictionarySearch from '../Search/DictionarySearch';
import MarketSearch from '../Search/MarketSearch';
import { FieldProps, StandardFormProps, StandardFormRefProps } from './data';

const StandardForm: ForwardRefRenderFunction<StandardFormRefProps, StandardFormProps> = (props, ref) => {
  const { fields, readonly, form, initialValues, functionCode, ...restProps } = props;
  const [formInner] = Form.useForm();

  const filterFields = useMemo(() => {
    return fields.filter((f) => !f.hideInForm);
  }, [fields]);

  useImperativeHandle(
    ref,
    () => ({
      validate: () => {
        if (form) {
          return form.validateFields();
        }
        return formInner.validateFields();
      },
      resetFields: () => {
        if (form) {
          return form.resetFields();
        }
        return formInner.resetFields();
      },
      setFieldsValue: (fields) => {
        if (form) {
          return form.setFieldsValue(fields);
        }
        return formInner.setFieldsValue(fields);
      },
    }),
    [form]
  );

  useEffect(() => {
    if (initialValues) {
      if (form) {
        form?.setFieldsValue(initialValues);
      } else {
        formInner?.setFieldsValue(initialValues);
      }
    }
  }, [initialValues]);

  /**
   * 渲染表单项
   * @param field 字段
   * @returns
   */
  const renderItem = (field: FieldProps) => {
    switch (field.type) {
      case 'text':
        return readonly || field.readonly ? (
          initialValues?.[`${field.name}`] || field.initialValue
        ) : (
          <Form.Item key={`${field.name}`} {...field}>
            <Input placeholder={`${field.label}`} clearable />
          </Form.Item>
        );
      case 'textarea':
        return readonly || field.readonly ? (
          initialValues?.[`${field.name}`] || field.initialValue
        ) : (
          <Form.Item key={`${field.name}`} {...field}>
            <TextArea placeholder={`${field.label}`} showCount />
          </Form.Item>
        );
      case 'brand':
        return (
          <Form.Item key={`${field.name}`} {...field}>
            <BrandSearch
              readonly={readonly || field.readonly}
              placeholder={`${field.label}`}
              functionCode={functionCode}
              {...field.brandConfig}
            />
          </Form.Item>
        );
      case 'market':
        return (
          <Form.Item key={`${field.name}`} {...field}>
            <MarketSearch
              readonly={readonly || field.readonly}
              placeholder={`${field.label}`}
              functionCode={functionCode}
              {...field.marketConfig}
            />
          </Form.Item>
        );
      case 'checkbox':
        return readonly || field.readonly ? (
          initialValues?.[`${field.name}`]
        ) : (
          <Form.Item key={`${field.name}`} {...field}>
            <Checkbox.Group>
              <Space>
                {field.options &&
                  field.options.map((opt) => (
                    <Checkbox key={`${opt.value}`} value={opt.value}>
                      {opt.label}
                    </Checkbox>
                  ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
        );
      case 'date':
        return readonly || field.readonly ? (
          dateFormat(initialValues?.[`${field.name}`])
        ) : (
          <Form.Item
            key={`${field.name}`}
            trigger="onConfirm"
            onClick={(_, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open();
            }}
            {...field}
          >
            <DatePicker precision="day" title="日期选择">
              {(value) => (value ? dateFormat(value) : '请选择日期')}
            </DatePicker>
          </Form.Item>
        );
      case 'datetime':
        return readonly || field.readonly ? (
          dateFormat(initialValues?.[`${field.name}`], 'YYYY-MM-DD HH:mm:ss')
        ) : (
          <Form.Item
            key={`${field.name}`}
            trigger="onConfirm"
            onClick={(_, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open();
            }}
            {...field}
          >
            <DatePicker precision="second" title="时间选择">
              {(value) => (value ? dateFormat(value, 'YYYY-MM-DD HH:mm:ss') : '请选择时间')}
            </DatePicker>
          </Form.Item>
        );
      case 'year':
        return readonly || field.readonly ? (
          dateFormat(initialValues?.[`${field.name}`], 'YYYY')
        ) : (
          <Form.Item
            key={`${field.name}`}
            trigger="onConfirm"
            onClick={(_, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open();
            }}
            {...field}
          >
            <DatePicker precision="year" title="年选择">
              {(value) => (value ? dateFormat(value, 'YYYY') : '请选择年')}
            </DatePicker>
          </Form.Item>
        );
      case 'month':
        return readonly || field.readonly ? (
          dateFormat(initialValues?.[`${field.name}`], 'MM')
        ) : (
          <Form.Item
            key={`${field.name}`}
            trigger="onConfirm"
            onClick={(_, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open();
            }}
            {...field}
          >
            <DatePicker precision="month" title="月选择">
              {(value) => (value ? dateFormat(value, 'MM') : '请选择月')}
            </DatePicker>
          </Form.Item>
        );
      case 'week':
        return readonly || field.readonly ? (
          dateFormat(initialValues?.[`${field.name}`], 'ddd')
        ) : (
          <Form.Item
            key={`${field.name}`}
            trigger="onConfirm"
            onClick={(_, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open();
            }}
            {...field}
          >
            <DatePicker precision="week" title="周选择">
              {(value) => (value ? dateFormat(value, 'ddd') : '请选择周')}
            </DatePicker>
          </Form.Item>
        );
      case 'dictionary':
        return (
          <Form.Item key={`${field.name}`} {...field}>
            <DictionarySearch
              readonly={readonly || field.readonly}
              placeholder={`${field.label}`}
              {...field.dicConfig}
            />
          </Form.Item>
        );
      case 'radio':
        return readonly || field.readonly ? (
          field.options?.find((opt) => opt.value === initialValues?.[`${field.name}`])?.label
        ) : (
          <Form.Item key={`${field.name}`} {...field}>
            <Radio.Group>
              <Space>
                {field.options &&
                  field.options.map((opt) => (
                    <Radio key={`${opt.value}`} value={opt.value}>
                      {opt.label}
                    </Radio>
                  ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        );
      case 'picker':
        return (
          <Form.Item key={`${field.name}`} {...field}>
            <CommonSearch
              readonly={readonly || field.readonly}
              placeholder={`${field.label}`}
              {...field.selectConfig}
            />
          </Form.Item>
        );
      case 'number':
        return readonly || field.readonly ? (
          initialValues?.[`${field.name}`]
        ) : (
          <Form.Item key={`${field.name}`} {...field}>
            <Stepper />
          </Form.Item>
        );
      case 'custom':
        return readonly || field.readonly ? (
          initialValues?.[`${field.name}`]
        ) : (
          <Form.Item key={`${field.name}`} {...field}>
            {field.render?.(initialValues?.[`${field.name}`])}
          </Form.Item>
        );
      case 'switch':
        return readonly || field.readonly ? (
          initialValues?.[`${field.name}`]
        ) : (
          <Form.Item key={`${field.name}`} {...field}>
            <Switch />
          </Form.Item>
        );
      default:
        return readonly || field.readonly ? (
          initialValues?.[`${field.name}`] || field.initialValue
        ) : (
          <Form.Item key={`${field.name}`} {...field}>
            <Input placeholder={`${field.label}`} clearable />
          </Form.Item>
        );
    }
  };
  return (
    <Form form={form || formInner} {...restProps}>
      {filterFields && filterFields.map((field) => renderItem(field))}
    </Form>
  );
};

export default memo(forwardRef(StandardForm));
