usage: 

```bash
npm i dz-script
```

eg: 
```javascript
import { delay, animate, updateWorkerjs } from 'dz-script'

await delay();
await delay(2000);


animate(1, 100, (val:number) => {
  console.log(val)
}, 1000)

// workerjs
const worker = new updateWorkerjs({
    pollingTime: 5,
    scriptUrl: '1.js'
})
worker.on('update', () => {
    alert('update')
})

```
