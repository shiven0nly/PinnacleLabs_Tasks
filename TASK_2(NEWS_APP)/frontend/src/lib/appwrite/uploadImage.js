import { ID, appwriteConfig, storage } from './appwrite';
import { Permission, Role } from 'appwrite';

// Upload file with public read permissions
export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file,
      [
        Permission.read(Role.any()), // Allow anyone to read the file
      ]
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Get File Url - Using getFileView for public access
export function getFilePreview(fileId) {
  try {
    // Use getFileView instead of getFilePreview for better public access
    const fileUrl = storage.getFileView(
      appwriteConfig.storageId,
      fileId
    );
    
    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
