// Shim for Claude's window.storage API, backed by localStorage.
// Mirrors the real API's shape: get()/set() resolve to {key, value, shared} or throw if missing.
(function () {
  function storageKey(key, shared) {
    return (shared ? "shared:" : "personal:") + key;
  }

  window.storage = {
    async get(key, shared) {
      const raw = localStorage.getItem(storageKey(key, shared));
      if (raw === null) {
        throw new Error("Key not found: " + key);
      }
      return { key, value: raw, shared: !!shared };
    },
    async set(key, value, shared) {
      localStorage.setItem(storageKey(key, shared), value);
      return { key, value, shared: !!shared };
    },
    async delete(key, shared) {
      const k = storageKey(key, shared);
      const existed = localStorage.getItem(k) !== null;
      localStorage.removeItem(k);
      return { key, deleted: existed, shared: !!shared };
    },
    async list(prefix, shared) {
      const wantedPrefix = (shared ? "shared:" : "personal:") + (prefix || "");
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(wantedPrefix)) {
          keys.push(k.slice(shared ? 7 : 9));
        }
      }
      return { keys, prefix, shared: !!shared };
    },
  };
})();
