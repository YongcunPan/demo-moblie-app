/**
 * 登录类型
 */
export enum EnumLoginType {
  PC端 = '1',
  手持端 = '2',
  其他 = '3',
  秘密基地 = '4',
  OMD = '5',
  CMD = '6',
  OMD手持 = '7',
  CMD手持 = '8',
}

/**
 * 用户类型
 */
export enum UserType {
  管理员 = 1,
  内部用户 = 2,
  外部用户 = 3,
}

/**
 * 功能枚举
 */
export enum EnumFunction {
  用户管理 = '10020101',
  角色管理 = '10020102',
  设施维修工单 = '10040201',
  设施清单 = '10020405',
  RSC设施类设备分类 = '100208001',
  LPP设施类设备分类 = '100208002',
  RSC设施类设备名称 = '100208003',
  LPP设施类设备名称 = '100208004',
  RSC设施类设备品牌 = '100208005',
  LPP设施类设备品牌 = '100208006',
  咨询 = '100412',
}

/**
 * 字典表枚举
 */
export enum EnumDictionaryCategory {
  费用类别分类 = 1,
  费用类别分类其他 = 2,
  签字页费用项 = 3,
  设施分类 = 4,
  日常维修时长 = 5,
  紧急维修时长 = 6,
  餐厅路程 = 7,
  派单间隔 = 8,
  项目类型 = 9,
  厂商人员角色 = 10,
  厂商人员等级 = 11,
  厂商税率分类 = 12,
  综合管理费采购类型 = 13,
  综合管理费计算方式 = 14,
  定额类别 = 15,
  风险检查设施名称 = 16,
  不检查原因 = 17,
  工单报备金额 = 19,
  材料类别 = 21,
  重置原因分类 = 26,
  超时原因 = 27,
  单双周 = 46,
  区域 = 50,
  IOT信息 = 51,
}

/**
 * 通用状态选项
 */
export const StatusOptions = [
  {
    label: '可用',
    value: true,
  },
  {
    label: '禁用',
    value: false,
  },
];

/**
 * 设备类型
 */
export enum EnumDeviceType {
  /**
   * H5网页
   */
  H5 = 1,
  /**
   * 百宝箱
   */
  MagicBox = 2,
  /**
   * 钉钉
   */
  DingTalk = 3,
}

export enum ScrapEnum {
  scrap = "报废设备数量",
  add = '新增设备数量'
}

export enum UserMsg {
  RGM = 1,
  DM = 2,
  BP = 3
}