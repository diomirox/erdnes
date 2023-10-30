# Erdnes Development Tools

Erdnes provides a set of development tools to streamline various tasks in your projects. These tools are designed to enhance your development experience. Below are the general tools offered by Erdnes.

## Binary Check File Detector

The `fileDetector` is a utility that allows you to determine the file extension of an input file. You can use it in your project as follows:

### Importing the `fileDetector` function

```typescript
import { fileDetector } from "erdnes";
```

### Example Usage

```typescript
const result = await fileDetector(file);
```

### Advanced Usage with `useFileDetector`

For more control and flexibility, you can use the `useFileDetector` hook. This is particularly useful when working with input elements in your application.

```typescript
import { useFileDetector } from "erdnes";

const detector = useFileDetector();

const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
  const extName = await detector(e.target.files[0]); // Returns pdf, png, webp, jpg, or unknown
  
  if (extName === "unknown") {
    // Handle unknown file types
    // ... your code
  }
};
```

## QueueRunner - Execute Tasks Sequentially

The `QueueRunner` class allows you to execute tasks one by one in a specified order. This can be particularly useful when you need to ensure that a series of tasks are completed sequentially.

### Importing the `QueueRunner` class

```typescript
import { QueueRunner } from "erdnes";
```

### Example Usage

```typescript
const queue = new QueueRunner([1, 2, 3, 4, 5], async (data) => {
  return doSomething(data); // Collect your results
});

const listener = queue.start(); // Start executing tasks one by one

listener.on("end", (result: ResultType[]) => {
  // Here, you have access to all the results in an array
  result.data;
});
```

Erdnes Development Tools provide a convenient way to handle file detection and execute tasks sequentially in your projects. These tools can help you enhance your development process and improve the user experience of your applications.