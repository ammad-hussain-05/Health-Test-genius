// products.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, docData, query, where, orderBy, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number | null;
  delivery: string[];
  locationType: string;
  postcode: string;
  tags: string[];
  verified: boolean;
  providerName: string;
  bookingUrl: string;
  timestamp: string;
  imageUrl?: string;
  distance?: number;
}

export interface SearchFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  locationType?: string;
  postcode?: string;
  verified?: boolean;
  providerName?: string;
}

export interface LocationData {
  postcode: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  area?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private firestore = inject(Firestore);

  constructor() { }

  // Get all products from the 'products' collection
  getAllProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<Product[]>;
  }

  // Get specific product by document ID
  getProductById(productId: string): Observable<Product | undefined> {
    const productRef = doc(this.firestore, 'products', productId);
    return docData(productRef, { idField: 'id' }) as Observable<Product | undefined>;
  }

  // Search products with filters
  searchProducts(searchTerm: string = '', filters: SearchFilters = {}): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => {
        let filtered = products;

        // Text search
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(product => 
            product.title.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term) ||
            product.tags.some(tag => tag.toLowerCase().includes(term)) ||
            product.providerName.toLowerCase().includes(term)
          );
        }

        // Apply filters
        if (filters.category) {
          filtered = filtered.filter(product => 
            product.category.toLowerCase() === filters.category?.toLowerCase()
          );
        }

        if (filters.locationType) {
          filtered = filtered.filter(product => 
            product.locationType === filters.locationType ||
            product.delivery.some(delivery => 
              delivery.toLowerCase().includes(filters.locationType?.toLowerCase() || '')
            )
          );
        }

        if (filters.priceMin !== undefined) {
          filtered = filtered.filter(product => 
            product.price !== null && product.price >= (filters.priceMin || 0)
          );
        }

        if (filters.priceMax !== undefined) {
          filtered = filtered.filter(product => 
            product.price !== null && product.price <= (filters.priceMax || Infinity)
          );
        }

        if (filters.verified !== undefined) {
          filtered = filtered.filter(product => 
            product.verified === filters.verified
          );
        }

        if (filters.providerName) {
          filtered = filtered.filter(product => 
            product.providerName.toLowerCase().includes(filters.providerName?.toLowerCase() || '')
          );
        }

        if (filters.postcode) {
          filtered = filtered.filter(product => 
            product.postcode.toLowerCase().includes(filters.postcode?.toLowerCase() || '')
          );
        }

        return filtered;
      })
    );
  }

  // Get unique categories for filter dropdown
  getCategories(): Observable<string[]> {
    return this.getAllProducts().pipe(
      map(products => {
        const categories = [...new Set(products.map(p => p.category))];
        return categories.sort();
      })
    );
  }

  // Get unique providers for filter dropdown  
  getProviders(): Observable<string[]> {
    return this.getAllProducts().pipe(
      map(products => {
        const providers = [...new Set(products.map(p => p.providerName))];
        return providers.sort();
      })
    );
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => 
        products.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        )
      )
    );
  }

  // Get products by location type
  getProductsByLocationType(locationType: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => 
        products.filter(product => 
          product.locationType === locationType ||
          product.delivery.some(delivery => 
            delivery.toLowerCase().includes(locationType.toLowerCase())
          )
        )
      )
    );
  }

  // Simulate location services (in real app, integrate with Google Maps API)
  getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In real app, use reverse geocoding to get postcode
            resolve({
              postcode: 'W1A 1AA', // Default London postcode
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              city: 'London',
              area: 'Central London'
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation not supported'));
      }
    });
  }

  // Search by postcode
  searchByPostcode(postcode: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => 
        products.filter(product => 
          product.postcode.toLowerCase().includes(postcode.toLowerCase())
        )
      )
    );
  }

  // Get health service categories for dropdown
  getHealthServiceCategories(): string[] {
    return [
      'Blood Test',
      'Cancer Check',
      'Care Service', 
      'CT Scan',
      'Dentists',
      'Dermatology',
      'Fertility Treatments',
      'GP Appointment',
      'Gynaecology',
      'Mental Health',
      'MRI Scan',
      'Physiotherapy',
      'STI Test',
      'Therapy',
      'Travel Vaccine',
      'Weight Loss Treatment',
      'Imaging',
      'Online Consultation'
    ];
  }
} 