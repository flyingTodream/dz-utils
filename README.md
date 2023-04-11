usage: 

```bash
npm i dz-script
```

eg: 
```javascript
import { delay, animate } from 'dz-script'

await delay();
await delay(2000);


animate(1, 100, (val:number) => {
  console.log(val)
}, 1000)
```
