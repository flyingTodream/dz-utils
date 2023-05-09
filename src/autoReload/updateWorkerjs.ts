import { htmlObjType, htmlTransform } from '../html/htmlTransform';

class updateWorkerjs {
  pollingTime: number;
  private myWork: any;
  path: string;
  private eventMap: any;
  scriptUrl: string;

  constructor(opt: { path?: string; pollingTime?: number; scriptUrl?: string }) {
    // 页面路径默认window.location.origin
    this.path = opt.path;
    // 循环间隔时间
    this.pollingTime = opt.pollingTime || 15;
    // 脚本地址，默认远程js地址，可设置成内网地址
    this.scriptUrl = opt.scriptUrl;

    this.myWork = undefined;
    this.eventMap = new Map();
    this.eventMap.set('update', new Set());
    this.eventMap.set('close', new Set());
    this.createWorkerjs();
  }

  on(event: string, handler: (e: any) => void) {
    this.eventMap.get(event).add(handler);
  }

  off(event: string, handler: (e: any) => void) {
    this.eventMap.get(event).delete(handler);
  }

  emit(event: string) {
    this.eventMap.get(event).forEach((handler: Function) => {
      handler(this, this);
    });
  }

  _error(err: any) {
    throw new Error(err);
  }

  async _getHtmlObj(): Promise<htmlObjType> {
    const res = await fetch(window.location.origin, {
      method: 'GET',
    });
    const data = await res.text();
    return htmlTransform(data);
  }

  _getCurrentHash(htmlObj: htmlObjType): string {
    for (const child of htmlObj.children) {
      if (child?.nodeName === 'script' && child?.src) {
        return child.src;
      }

      // 递归查找子节点
      const result = this._getCurrentHash(child);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }

  _getScript() {
    return fetch(this.scriptUrl || 'https://static.flytodream.cn/dz-reload.js', { method: 'get' }).then((res) =>
      res.text()
    );
  }

  // 创建worker线程
  async createWorkerjs() {
    const htmlObj = await this._getHtmlObj();
    const currentHash = this._getCurrentHash(htmlObj);

    if (window.Worker) {
      const workjsTemplate = await this._getScript();
      const localWorkerUrl = window.URL.createObjectURL(
        new Blob([workjsTemplate], {
          type: 'application/javascript',
        })
      );
      this.myWork = new Worker(localWorkerUrl);

      this.myWork.postMessage({
        pollingTime: this.pollingTime,
        location: this.path || window.location.origin,
        currentHash,
      });
      this.myWork.onmessage = async (e: any) => {
        const message = e.data;
        if (message === 'update') {
          this.emit('update');
          this.close();
        } else if (message === 'cancel') {
          this._error('do not find a script tag');
          this.close();
        }
      };
    } else {
      this._error('Your browser does not support web workers.');
    }
  }

  public close() {
    if (this.myWork) {
      this.myWork.terminate();
      this.myWork = undefined;
      this.emit('close');
    }
  }
}

export { updateWorkerjs };
