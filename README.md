# Erdnes Development Tools

Erdnes offers a comprehensive suite of development tools to streamline various tasks in your projects, designed to enhance your development experience. Below, we outline the general tools provided by Erdnes.

## Binary Check File Detector

The `fileDetector` is a versatile utility that allows you to determine the file extension of an input file. Incorporate it into your project as follows:

### Importing the `fileDetector` Function

```typescript
import { fileDetector } from "erdnes";
```

### Example Usage

```typescript
const result = await fileDetector(file);
```

### Advanced Usage with `useFileDetector`

For added control and flexibility, consider using the `useFileDetector` hook. This is particularly valuable when working with input elements in your application.

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

The `QueueRunner` class empowers you to execute tasks one by one in a specified order. This can be particularly useful when you need to ensure that a series of tasks are completed sequentially.

### Importing the `QueueRunner` Class

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

## QueueRunner - Custom Concurrency

The **QueueRunner** class allows you to customize the concurrency of task execution, empowering you to optimize performance for your project.

### Example Usage

To execute tasks with a custom concurrency level, simply provide the desired concurrency as an argument when creating a `QueueRunner` instance. For example, to execute four tasks concurrently:

```javascript
const queue = new QueueRunner(queue, yourTaskFunction, 4); // Execute 4 tasks concurrently
```

This feature offers flexibility and efficiency, allowing you to adapt task execution to your project's specific needs. Fine-tune concurrency for better resource utilization and performance optimization.

This concise section explains how to control concurrency using the `QueueRunner` class with an example for reference.

---

Erdnes Development Tools provide a convenient way to handle file detection and execute tasks sequentially in your projects. These tools can help you enhance your development process and improve the user experience of your applications. Explore these tools to boost productivity and streamline your project's development workflow.