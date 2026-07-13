import { apiClient } from "./client";
import type { Product, Category } from "@/types/product";

export function fetchProducts(): Promise<Product[]>{
    return apiClient.get<Product[]>('/products')
}

export function fetchProductById(id: number): Promise<Product>{
    return apiClient.get<Product>(`/products/${id}`)
}

export function fetchCategories(): Promise<Category[]>{
    return apiClient.get<Category[]>('/products/categories')
}

export function fetchProductsByCategory(category: string): Promise<Product[]>{
    return apiClient.get<Product[]>(`/products/category/${encodeURIComponent(category)}`)
}