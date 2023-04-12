type UploadFileType = {
  uploadFun: () => void;
};

function useUploadFile(executeUpload: (file: any) => void): UploadFileType;
function useUploadFile(executeUpload: (file: any) => void, onError?: (msg: string) => void): UploadFileType;

/**
 *
 * @param executeUpload 上传文件，发送请求
 * @param onError 错误回调
 * @returns
 */
function useUploadFile(executeUpload: (file: any) => void, onError?: (msg: string) => void): UploadFileType {
  if (typeof executeUpload !== 'function') {
    throw new Error('the firse param muse be a function');
  }
  if (onError && typeof onError !== 'function') {
    throw new Error('the secend param muse be a function');
  }

  const uploadFun = (): void => {
    const els = document.querySelectorAll('[data-id="upload"]');
    els.forEach((item) => {
      item.remove();
    });
    const upload = document.createElement('input');
    upload.setAttribute('style', `display: none;`);
    upload.setAttribute('data-id', 'upload');
    upload.setAttribute('type', 'file');
    document.body.appendChild(upload);
    upload.focus();
    upload.click();
    upload.addEventListener('change', async () => {
      if (upload.files) {
        if (upload.files.length === 0) onError('请选择文件');
        executeUpload(upload.files[0]);
        setTimeout(() => {
          upload.remove();
        }, 0);
      }
    });
  };
  return {
    uploadFun,
  };
}
/**
 * 组装请求数据
 * @param formData 要发送的FormData对象
 * @param data 要传递给服务器的数据
 * @returns
 */
export function appendData(formData: FormData, data: any): void {
  if (!data) return;
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
}

export { useUploadFile };
