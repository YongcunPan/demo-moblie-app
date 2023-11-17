import { apiUrl } from '@/constants/api';
import { EnumDeviceType } from '@/constants/enum';
import { restCode } from '@/constants/rest';
import { queryAttachmentDetail, uploadAttachment, uploadImageMagicBox, delAttachment } from '@/services/common';
import { alertUtil, messageUtil } from '@/utils/message';
import { getDeviceType, getToken } from '@/utils/request';
import { Dialog, ImageUploader, ImageUploadItem, ImageViewer } from 'antd-mobile';
import React, { ForwardRefRenderFunction, useEffect, useImperativeHandle, useState } from 'react';
import { ImageUploadProps, FileOption, ImageUploadRefProps } from './data';

const deviceType = getDeviceType();

const ImageUpload: ForwardRefRenderFunction<ImageUploadRefProps, ImageUploadProps> = (props, ref) => {
  const { multiple, maxFileNumbers, fileGroup, accessToken, readonly, value, onChange, onUploadFinish, length } = props;
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const [tempValue, setTempValue] = useState<number>();
  const token = getToken();
  const imageTypes = ['.png', '.svg', '.ico', '.jpg', '.jpeg', '.bmp'];

  useImperativeHandle(ref, () => ({
    getAttachmentId: (): number => {
      return tempValue || 0;
    },
  }));

  /**
   * 处理预览
   * @param file 文件
   */
  const handlePreview = async (index?: number) => {
    ImageViewer.Multi.show({
      defaultIndex: index,
      images: fileList.map((f) => f.url),
    });
  };

  useEffect(() => {
    
    if (value) {
      // 调用service获取附件信息
      queryAttachmentDetail({
        attachmentId: value,
        needLoadBase64: false,
        fileGroup,
      }).then((res) => {
        if (res.code === restCode.success) {
          //过滤非图片类型进行展示
          const list = res.data.filter((f: any) => imageTypes.indexOf(f.fileType?.toLowerCase() || '') > -1);
          setFileList(
            list.map((f: FileOption) => ({
              key: f.id,
              url: `${apiUrl.getImage}/${f.id}?auth=${token}`,
            }))
          );
          onChange?.(res.data[0].attachmentId);
        } else {
          alertUtil.error(res.message);
        }
      });
      setTempValue(value);
    } else {
      setTempValue(0);
    }
  }, [value]);

  /**
   * 上传前校验
   * @param file 文件
   * @returns
   */
  const beforeUpload = (file: File) => {
    console.log(file,'file');
    
    if (file.size > 1024 * 1024 * 10) {
      alertUtil.info('请选择小于10M的图片');
      return null;
    }
    return file;
  };

  /**
   * 是否确认删除
   * @returns 删除
   */
  const onDelete = async (item: ImageUploadItem) => {
    let result: any = await Dialog.confirm({ content: '是否确认删除?' });
    if (result) {
      result = await delAttachment({ ids: [item.key] });
      if (result.code !== restCode.success) {
        alertUtil.error(result.message);
      }
    }
    return result;
  };

  /**
   * 上传
   * @param file 文件
   */
  const upload = (file: File) => {
    return new Promise<ImageUploadItem>((uReslove, uReject) => {
      if (deviceType === EnumDeviceType.DingTalk) {
        // dingTalkUtil.uploadImage({ count: 9, sourceType: ['camera', 'album'] }).then((files) => {
        //   setFileList(files);
        //   onChange?.(files[0].attachmentId);
        //   onUploadFinish?.(files[0].attachmentId);
        //   uReslove({ key: 'dingTalk', url: '' });
        // });
        uploadAttachment({
          file,
          attachmentId: tempValue,
          fileGroup,
        }).then((res) => {
          if (res.code === restCode.success) {
            onChange?.(res.data[0].attachmentId);
            onUploadFinish?.(res.data?.[0].attachmentId);
            uReslove({
              key: res.data[0].id,
              url: `${apiUrl.getImage}/${res.data[0].id}?auth=${token}`,
            });
          } else {
            alertUtil.error(res.message);
            uReject();
          }
        });
      } else {
        uploadAttachment({
          file,
          attachmentId: tempValue,
          fileGroup,
        }).then((res) => {
          if (res.code === restCode.success) {
            onChange?.(res.data[0].attachmentId);
            onUploadFinish?.(res.data?.[0].attachmentId);
            uReslove({
              key: res.data[0].id,
              url: `${apiUrl.getImage}/${res.data[0].id}?auth=${token}`,
            });
          } else {
            alertUtil.error(res.message);
            uReject();
          }
        });
      }
    });
  };

  /**
   * 生成图片
   */
  const renderPicture = () => {
    return (
      <ImageUploader
        beforeUpload={beforeUpload}
        columns={length || 5}
        multiple={multiple}
        maxCount={maxFileNumbers || 20}
        showUpload={!readonly}
        onChange={setFileList}
        onPreview={handlePreview}
        value={fileList}
        deletable={!readonly}
        onDelete={onDelete}
        upload={upload}
      />
    );
  };

  return <div>
    <div style={{color:'#666'}}>上传图片：</div>
    {readonly?null:<div style={{color:'#ccc',margin:'5px 0 10px 0'}}>※上传完好的内容</div>}
    {renderPicture()}
  </div>;
};

export default React.forwardRef(ImageUpload);
