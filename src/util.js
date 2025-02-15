// Helper function to convert file path to file:// URL on Windows 
export const toFileURL = (filePath) => {
  if (process.platform === 'win32') {
    return `file:///${filePath.replace(/\\/g, '/')}`;
  }
  return `file://${filePath}`;
};