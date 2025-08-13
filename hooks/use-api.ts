import { useState, useCallback, useEffect, useMemo } from 'react';
import { ApiResponse, ApiError } from '../lib/types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T> | ApiError>,
  immediate = false,
  ...immediateArgs: any[]
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await apiFunction(...args);
        
        if (response.success) {
          setState(prev => ({ ...prev, data: response.data, loading: false }));
        } else {
          const errorResponse = response as ApiError;
          setState(prev => ({ 
            ...prev, 
            error: errorResponse.error?.message || 'API request failed', 
            loading: false 
          }));
        }
      } catch (error) {
        setState(prev => ({ 
          ...prev, 
          error: error instanceof Error ? error.message : 'An error occurred', 
          loading: false 
        }));
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  // Stabilize the immediate arguments with JSON.stringify for comparison
  const stableArgs = useMemo(() => immediateArgs, [JSON.stringify(immediateArgs)]);

  useEffect(() => {
    if (immediate) {
      execute(...stableArgs);
    }
  }, [immediate, execute, stableArgs]);

  return { ...state, execute, reset };
}

// Specific hooks for common use cases
export function useProducts(params?: any) {
  // Memoize the clean params to prevent recreation on every render
  const cleanParams = useMemo(() => {
    if (!params) return undefined;
    
    return Object.fromEntries(
      Object.entries(params).filter(([key, value]) => 
        value !== "" && value !== null && value !== undefined
      )
    );
  }, [JSON.stringify(params)]);

  return useApi(
    () => import('../lib/services/api').then(m => m.productService.getProducts(cleanParams)),
    true
  );
}

export function useProduct(id: string | number) {
  return useApi(
    () => import('../lib/services/api').then(m => m.productService.getProductById(String(id))),
    !!id,
    id
  );
}

export function useEnquiries(params?: any) {
  return useApi(
    () => import('../lib/services/api').then(m => m.enquiryService.getEnquiries(params)),
    true,
    params
  );
}

export function useEnquiry(id: string) {
  return useApi(
    () => import('../lib/services/api').then(m => m.enquiryService.getEnquiryById(id)),
    !!id,
    id
  );
}

export function useDashboardStats() {
  return useApi(
    () => import('../lib/services/api').then(m => m.dashboardService.getStats()),
    true
  );
}

export function useNotifications(params?: any) {
  return useApi(
    () => import('../lib/services/api').then(m => m.notificationService.getNotifications(params)),
    true,
    params
  );
}

export function useSettings(category?: string) {
  return useApi(
    () => category 
      ? import('../lib/services/api').then(m => m.settingsService.getSettingsByCategory(category))
      : import('../lib/services/api').then(m => m.settingsService.getAllSettings()),
    true,
    category
  );
}

export function useFiles(params?: any) {
  return useApi(
    () => import('../lib/services/api').then(m => m.uploadService.getFiles(params)),
    true,
    params
  );
} 