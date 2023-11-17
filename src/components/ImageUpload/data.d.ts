export type FileOption = {
  id?: number;
  attachmentId?: number;
  fileType?: string;
  fileName?: string;
  fileLength?: number;
  fileRename?: string;
  filePath?: string;
  comment?: string;
  base64?: string;
  url: string;
  file?: File;
};

export type ImageUploadProps = {
  /**
   * 是否允许一次上传多个
   */
  multiple?: boolean;
  /**
   * 标题
   */
  title?: string;
  /**
   * 最多上传的文件数
   */
  maxFileNumbers?: number;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 导入的Action URL
   */
  importAction?: string;
  /**
   * 回调
   */
  callback?: () => void;
  /**
   * 用户form获取attachmentId
   */
  value?: number;
  /**
   * 文件分组
   */
  fileGroup?: string;
  /**
   * 改变事件，用户form
   */
  onChange?: (val: number) => void;
  /**
   * 加载
   */
  loading?: { [key: string]: boolean };

  /**
   * 唯一Key值，用来读取和保存数据
   */
  upKey?: string;
  /**
   * 百宝箱上传文件Token
   */
  accessToken?: string;
  /**
   * upload finish callback
   */
  onUploadFinish?: (val: number) => void;
  /**
   * 单行图片数量
   */
  length?: number;
};

export type ImageUploadRefProps = {
  getAttachmentId: () => number;
};
