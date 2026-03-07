export function Retry(maxAttempts = 3, delayMs = 5000) {
  return function (
    target: any,
    propertyKey: string,
    description: PropertyDescriptor,
  ) {
    const originalFunction = description.value as (...args: []) => any;

    description.value = async function (...args: any) {
      let lastError: Error = new Error('Unknown error');

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const result: unknown = await originalFunction.apply(this, args);
          return result;
        } catch (err) {
          lastError = err as Error;

          console.log(
            `Attempt ${attempt} Retrying in ${delayMs / 1000} seconds`,
          );
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
      throw lastError;
    };

    return description;
  };
}
