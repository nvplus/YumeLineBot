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
  debug: (param) =>  console.log(`[DEBUG] [${getISOStringNow()}]`, param),
  error: (err) => console.error(`[ERROR] [${getISOStringNow()}]`, err),
}

export const isValidCard = (cardId) => {
  const pattern = '^[0-9A-F]{16}$';
  const regex = new RegExp(pattern);
  return regex.test(cardId);
}