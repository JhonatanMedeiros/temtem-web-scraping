const info = (...args: any[]) => {
  log('info', '[INFO]', ...args);
};

const error = (...args: any[]) => {
  log('error', '[ERROR]', ...args);
};

const warn = (...args: any[]) => {
  log('warn', '[WARN]', ...args);
};

const todo = (...args: any[]) => {
  log('info', '[TODO]', ...args);
};

const log = (severity: 'info' | 'error' | 'warn', ...args: string[]) => {
  console[severity](...args);
};

export {
  info,
  error,
  warn,
  todo
};
