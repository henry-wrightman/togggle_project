import { useCallback } from 'react';
import http from '../http-common';

function useApiCall(path, method, data) {
  return useCallback(() => {
    try {
      switch (method) {
        case 'GET':
          return http.get(path);
        case 'POST':
          return http.post(path, data);
        default:
          break;
      }
    } catch (e) {
      //console.error(e);
      return { data: null, error: e?.message };
    }
  }, [path, method, data]);
}

export default useApiCall;
