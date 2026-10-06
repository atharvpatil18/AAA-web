/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// IndexedDB database name and store name for files
const DB_NAME = "aaa_documents_vault_db";
const DB_VERSION = 1;
const STORE_NAME = "vault_blobs";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not supported in this browser."));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

/**
 * Stores a large file (PDF, doc, image) directly into IndexedDB without size limits.
 */
export async function storeFileInIndexedDB(fileId: string, fileBlob: Blob | File): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(fileBlob, fileId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieves a file from IndexedDB as a downloadable Object URL (Blob URL).
 */
export async function getFileUrlFromIndexedDB(fileId: string): Promise<string | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(fileId);

    request.onsuccess = () => {
      const result = request.result;
      if (result instanceof Blob) {
        resolve(URL.createObjectURL(result));
      } else {
        resolve(null);
      }
    };

    request.onerror = () => reject(request.error);
  });
}

/**
 * Deletes a file from IndexedDB.
 */
export async function deleteFileFromIndexedDB(fileId: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(fileId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn("Failed to delete file from IndexedDB", err);
  }
}
