# Erdnes Development tools

## General Tools

 - Binary check file detector

  
  ```ts
  import { fileDetector } from "erdnes/lib"

  const result = await fileDetector(file);
  
  ```

  ```ts
  import { useFileDetector } from "erdnes/hooks"

  const detector = useFileDetector():
  
  const handleInput = async (e:ChangeEvent<HTMLInputElement>) => {
    const extName = await detector(e.target.files[0]); // pdf, png, webp, jpg, unknown;
    
    if(extName === "unknown") {
      ...code
    }
  }

  ```

 - QueueRunner execute one by one

  ```ts

  import { QueueRunner } from "erdnes/lib";
  
  const queue = new QueueRunner([1,2,3,4,5], async (data) => {
    return doSomething(data); // collection your result
  });

  const listener = queue.start(); // starting execute array one by one
  
  listener.on("end", (result: ResultType[]) => {
    result.data  // <-- here your all results in array 
  });

  ```

## Nextjs Tools

- Cookie tools - You can use these actions anywhere you want

```ts
import { getCookie, setCookie } from "erdnes/sa"
```
  