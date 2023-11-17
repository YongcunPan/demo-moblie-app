import AuthButton from '@/components/AuthButton';
import ContentGroup from '@/components/ContentGroup';
import StandardForm from '@/components/StandardForm';
import { FieldProps } from '@/components/StandardForm/data';
import StandardTable from '@/components/StandardTable';
import { TableButton, StandardColumn, TableService } from '@/components/StandardTable/data';
import { EnumFunction } from '@/constants/enum';
import { httpGet } from '@/utils/request';

export async function queryCurrent(params: any) {
  return httpGet(`/fis-toe-facility-equip/api/equip/list`, params);
}

const TestPage: React.FC = () => {
  const columns: StandardColumn<any>[] = [
    {
      title: 'No',
      dataIndex: 'no',
      hideInSearch: true,
    },
    {
      title: '厂商名称',
      dataIndex: 'name',
    },
    {
      title: 'JDE Code',
      dataIndex: 'jdeCode',
    },
  ];
  const service: TableService = {
    query: queryCurrent,
  };

  const tabs = {
    totalService: queryCurrent,
    totalField: 'total',
    queryFiled: 'type',
    onTabChange: () => {},
    items: [
      {
        key: 1,
        title: '测试一',
      },
      {
        key: 2,
        title: '测试二',
      },
    ],
  };

  const btns: TableButton[] = [
    {
      key: '1',
      authKey: 'view',
      text: '发布',
      onClick: () => {},
    },
    {
      key: '2',
      authKey: 'view',
      text: '转CR',
      onClick: () => {},
    },
  ];

  const rowButtons: TableButton[] = [
    {
      key: '1',
      authKey: 'view',
      text: '发布',
      onClick: () => {},
    },
    {
      key: '2',
      authKey: 'view',
      text: '转CR',
      onClick: () => {},
    },
  ];

  const fields: FieldProps[] = [
    {
      name: 'test',
      label: '测试',
      type: 'brand',
    },
    {
      name: 'test2',
      label: '测试2',
      type: 'market',
    },
    {
      name: 'test3',
      label: '测试2',
      type: 'dictionary',
    },
  ];

  return (
    <div>
      <ContentGroup title="表格">
        <StandardTable
          columns={columns}
          service={service}
          functionCode={EnumFunction.设施清单}
          searchFormConfig={{
            initialValues: { cnName: 2 },
          }}
          editFormConfig={{
            colNum: 2,
            width: 800,
          }}
          headerConfig={{
            tabs,
            buttons: btns,
          }}
          rowButtons={rowButtons}
        />
      </ContentGroup>
      <ContentGroup title="表单">
        <StandardForm fields={fields} colNum={3} />
      </ContentGroup>
      <AuthButton name="" />
    </div>
  );
};

export default TestPage;
