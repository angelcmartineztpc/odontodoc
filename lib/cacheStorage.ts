/**
 * Offline-first IndexedDB local cache storage for OdontoDoc
 * 
 * Provides robust auto-saving for complete clinical dossiers including Base64 photos,
 * overcoming the 5MB quota limitation of localStorage.
 */

import { OdontoDocument } from "./types";
import { validateOdontoDocument } from "./fileStorage";

const DB_NAME = "odontodoc_clinical_db";
const DB_VERSION = 1;
const STORE_NAME = "clinical_drafts";
const DRAFT_KEY = "active_clinical_record";
const BACKUP_LS_KEY = "odontodoc_draft_backup";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not available in this environment"));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error("Failed to open IndexedDB"));
    };
  });
}

/**
 * Saves the current clinical document draft to IndexedDB (with fallback to localStorage)
 */
export async function saveClinicalDraft(doc: OdontoDocument): Promise<void> {
  const timestamp = new Date().toISOString();
  const payload = {
    doc,
    savedAt: timestamp,
  };

  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const putRequest = store.put(payload, DRAFT_KEY);

      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    });

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("odontodoc_last_saved", timestamp);
    }
  } catch (err) {
    console.warn("IndexedDB save failed, attempting localStorage backup:", err);
    try {
      if (typeof localStorage !== "undefined") {
        // Fallback to localStorage: store full or stripped payload if too big
        localStorage.setItem(BACKUP_LS_KEY, JSON.stringify(doc));
        localStorage.setItem("odontodoc_last_saved", timestamp);
      }
    } catch (lsErr) {
      console.warn("LocalStorage backup quota exceeded as well:", lsErr);
    }
  }
}

/**
 * Loads the active clinical document draft from IndexedDB (or fallback localStorage)
 */
export async function loadClinicalDraft(): Promise<{ doc: OdontoDocument; savedAt: string } | null> {
  try {
    const db = await openDatabase();
    const result = await new Promise<{ doc: OdontoDocument; savedAt: string } | undefined>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get(DRAFT_KEY);

      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = () => reject(getRequest.error);
    });

    if (result && result.doc && validateOdontoDocument(result.doc)) {
      return result;
    }
  } catch (err) {
    console.warn("IndexedDB load failed, trying localStorage fallback:", err);
  }

  // Fallback check in localStorage
  try {
    if (typeof localStorage !== "undefined") {
      const backupStr = localStorage.getItem(BACKUP_LS_KEY);
      const savedAt = localStorage.getItem("odontodoc_last_saved") || new Date().toISOString();
      if (backupStr) {
        const parsed = JSON.parse(backupStr);
        if (validateOdontoDocument(parsed)) {
          return { doc: parsed, savedAt };
        }
      }
    }
  } catch (lsErr) {
    console.warn("LocalStorage fallback load failed:", lsErr);
  }

  return null;
}

/**
 * Clears the active clinical document draft from IndexedDB and localStorage
 */
export async function clearClinicalDraft(): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const deleteRequest = store.delete(DRAFT_KEY);

      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    });
  } catch (err) {
    console.warn("IndexedDB clear failed:", err);
  }

  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(BACKUP_LS_KEY);
      localStorage.removeItem("odontodoc_last_saved");
    }
  } catch {
    // Ignore
  }
}
