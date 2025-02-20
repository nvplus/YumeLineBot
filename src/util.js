// Helper function to convert file path to file:// URL on Windows 
export const toFileURL = (filePath) => {
  if (process.platform === 'win32') {
    return `file:///${filePath.replace(/\\/g, '/')}`;
  }
  return `file://${filePath}`;
};

const getISOStringNow = () => {
  const dt = new Date();
  return dt.toISOString();
}

export const log = {
  debug: (msg) =>  console.log(`[DEBUG] [${getISOStringNow()}]`, msg),
  error: (err) => console.error(`[ERROR] [${getISOStringNow()}]`, err),
  warn: (msg) =>  console.log(`[WARNING] [${getISOStringNow()}]`, msg),
}

export const isValidCard = (cardId) => {
  const pattern = '^[0-9A-F]{16}$';
  const regex = new RegExp(pattern);
  return regex.test(cardId);
}