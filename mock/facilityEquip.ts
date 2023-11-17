import { defineMock } from 'umi';
const mockData = (data: any, code: string = '000000', message: string = '') => {
  return {
    code,
    message,
    data,
  };
};
export default defineMock({
  'GET /fis-toe-facility-equip/api/equip/list': mockData({
    data: [
      {
        id: 1,
        category: '测试1',
        name: '名称1',
        brand: '品牌1',
        model: '型号1',
        desc: '测试测试',
        market: '苏州',
        status: 1,
      },
      {
        id: 2,
        category: '测试2',
        name: '名称2',
        brand: '品牌2',
        model: '型号2',
        desc: '测试测试',
        market: '苏州',
        status: 0,
      },
      {
        id: 3,
        category: '测试3',
        name: '名称3',
        brand: '品牌3',
        model: '型号3',
        desc: '测试测试',
        market: '苏州',
        status: 0,
      },
      {
        id: 4,
        category: '测试4',
        name: '名称4',
        brand: '品牌4',
        model: '型号4',
        desc: '测试测试',
        market: '苏州',
        status: 0,
      },
    ],
    current: 1,
    total: 999,
  }),
  'POST /fis-toe-facility-equip/api/equip/save': mockData({}),
  'GET /fis-toe-facility-equip/api/equip/del': mockData({}, '000000', 'deied'),
  'GET /fis-toe-facility-equip/api/equip/export': mockData({}),
  'POST /fis-toe-facilityequip/api/facilityInstallSheet/page2': mockData({
    total: 100,
    data: [
      {
        id: 1,
        storeCode: 'szh085',
        storeName: '金凤瑜伽1',
        newEquipName: '旧设备',
        createTime: '2022-11-30',
        equipInformation: '风幕机',
      },
      {
        id: 2,
        storeCode: 'szh085',
        storeName: '金凤瑜伽2',
        newEquipName: '新设备',
        createTime: '2022-11-30',
        equipInformation: '风幕机',
        newEquip: true,
      },
      {
        id: 3,
        storeCode: 'szh085',
        storeName: '金凤瑜伽3',
        newEquipName: '旧设备',
        createTime: '2022-11-30',
        equipInformation: '风幕机',
      },
      {
        id: 4,
        storeCode: 'szh085',
        storeName: '金凤瑜伽4',
        newEquipName: '旧设备',
        createTime: '2022-11-30',
        equipInformation: '风幕机',
      },
      {
        id: 5,
        storeCode: 'szh085',
        storeName: '金凤瑜伽5',
        newEquipName: '旧设备',
        createTime: '2022-11-30',
        equipInformation: '风幕机',
      },
    ],
  }),
});
