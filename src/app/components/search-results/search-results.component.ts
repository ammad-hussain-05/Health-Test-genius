import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, Product, SearchFilters } from '../../services/products.service';

// Declare Google Maps types
declare var google: any;
declare var window: any;

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  standalone: false
})
export class SearchResultsComponent implements OnInit {
  
  // Search parameters
  searchService = '';
  selectedLocation = '';
  selectedDeliveryType = '';
  searchTerm = '';
  userLocation = '';

  // Results and loading state
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  totalResults = 0;

  // Filter options
  categories: string[] = [];
  providers: string[] = [];
  priceRanges = [
    { label: 'Under £50', value: '0-50' },
    { label: '£50 - £100', value: '50-100' },
    { label: '£100 - £200', value: '100-200' },
    { label: '£200 - £500', value: '200-500' },
    { label: 'Over £500', value: '500+' }
  ];

  // Applied filters
  selectedFilters: SearchFilters = {};
  selectedPriceRange = '';
  selectedCategory = '';
  selectedProvider = '';
  verifiedOnly = false;

  // Sorting
  sortOptions = [
    { label: 'Best Match', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Verified First', value: 'verified' },
    { label: 'A-Z', value: 'name-asc' }
  ];
  selectedSort = 'relevance';

  // UI state
  showFilters = false;
  filtersCount = 0;

  // New search bar properties
  newSearchService = '';
  newSearchSubService = '';
  newSearchLocation = '';
  newDeliveryType = 'at-home';
  isLoadingLocation = false;
  
  // Available options for search bar
  availableServices: { value: string, label: string, subOptions?: { value: string, label: string }[] }[] = [];
  availableSubServices: { value: string, label: string }[] = [];

  // Map view properties
  viewMode: 'list' | 'map' = 'list';
  map: any = null;
  markers: any[] = [];
  userLocationMarker: any = null;
  selectedProductIndex: number = -1;
  userLatLng: { lat: number, lng: number } | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    // Get search parameters from route
    this.route.queryParams.subscribe(params => {
      this.searchService = params['service'] || '';
      this.selectedLocation = params['location'] || '';
      this.selectedDeliveryType = params['locationType'] || '';
      this.userLocation = params['userLocation'] || '';
      this.searchTerm = params['q'] || '';
      
      this.performSearch();
    });

    // Load filter options
    this.loadFilterOptions();
    
    // Initialize search bar options
    this.initializeSearchBarOptions();
    
    // Set current search values in the new search bar
    this.initializeCurrentSearchValues();
  }

  formatServiceName(serviceName: string): string {
    return serviceName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  loadFilterOptions(): void {
    // Load categories
    this.productsService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    // Load providers
    this.productsService.getProviders().subscribe(providers => {
      this.providers = providers;
    });
  }

  performSearch(): void {
    this.isLoading = true;
    
    // Build search filters
    const filters: SearchFilters = {};

    // Add service filter if specified
    if (this.searchService) {
      const serviceCategory = this.mapServiceToCategory(this.searchService);
      if (serviceCategory) {
        filters.category = serviceCategory;
      }
    }

    // Add location type filter
    if (this.selectedDeliveryType) {
      filters.locationType = this.selectedDeliveryType;
    }

    // Add location filter
    if (this.selectedLocation) {
      filters.postcode = this.selectedLocation;
    }

    // Perform search
    this.productsService.searchProducts(this.searchTerm, filters).subscribe(products => {
      this.allProducts = products;
      this.applyFiltersAndSort();
      this.isLoading = false;
    });
  }

  mapServiceToCategory(service: string): string {
    const serviceMap: { [key: string]: string } = {
      'blood-test': 'Blood Test',
      'cancer-check': 'Cancer Check',
      'care-homes': 'Care Service',
      'ct-scan': 'Imaging',
      'mri-scan': 'Imaging',
      'gp-appointment': 'GP Appointment',
      'sti-test': 'STI Test',
      'travel-vaccine': 'Travel Vaccine',
      'weight-loss-treatment': 'Weight Loss Treatment'
    };
    return serviceMap[service] || '';
  }

  applyFiltersAndSort(): void {
    let filtered = [...this.allProducts];

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    // Apply provider filter
    if (this.selectedProvider) {
      filtered = filtered.filter(p => 
        p.providerName.toLowerCase().includes(this.selectedProvider.toLowerCase())
      );
    }

    // Apply price range filter
    if (this.selectedPriceRange) {
      const [min, max] = this.parsePriceRange(this.selectedPriceRange);
      filtered = filtered.filter(p => {
        if (p.price === null) return false;
        if (max === Infinity) return p.price >= min;
        return p.price >= min && p.price <= max;
      });
    }

    // Apply verified filter
    if (this.verifiedOnly) {
      filtered = filtered.filter(p => p.verified);
    }

    // Apply sorting
    filtered = this.sortProducts(filtered);

    this.filteredProducts = filtered;
    this.totalResults = filtered.length;
    this.updateFiltersCount();
  }

  parsePriceRange(range: string): [number, number] {
    switch (range) {
      case '0-50': return [0, 50];
      case '50-100': return [50, 100];
      case '100-200': return [100, 200];
      case '200-500': return [200, 500];
      case '500+': return [500, Infinity];
      default: return [0, Infinity];
    }
  }

  sortProducts(products: Product[]): Product[] {
    switch (this.selectedSort) {
      case 'price-asc':
        return products.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return a.price - b.price;
        });
      case 'price-desc':
        return products.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return b.price - a.price;
        });
      case 'verified':
        return products.sort((a, b) => {
          if (a.verified && !b.verified) return -1;
          if (!a.verified && b.verified) return 1;
          return 0;
        });
      case 'name-asc':
        return products.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return products;
    }
  }

  updateFiltersCount(): void {
    this.filtersCount = 0;
    if (this.selectedCategory) this.filtersCount++;
    if (this.selectedProvider) this.filtersCount++;
    if (this.selectedPriceRange) this.filtersCount++;
    if (this.verifiedOnly) this.filtersCount++;
  }

  onViewService(result: Product): void {
    // Navigate to service details page
    const serviceName = result.title.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/service-details', serviceName], {
      queryParams: {
        id: result.id,
        name: result.title,
        price: result.price
      }
    });
  }

  onBookService(result: Product): void {
    // Handle booking - could navigate to booking page or open modal
    console.log('Booking service:', result);
    alert(`Booking ${result.title} - £${result.price}`);
    
    // Example navigation to booking page:
    // this.router.navigate(['/book'], {
    //   queryParams: {
    //     service: result.id,
    //     provider: result.title,
    //     price: result.price
    //   }
    // });
  }

  // Filter change handlers
  onCategoryChange(): void {
    this.applyFiltersAndSort();
  }

  onProviderChange(): void {
    this.applyFiltersAndSort();
  }

  onPriceRangeChange(): void {
    this.applyFiltersAndSort();
  }

  onVerifiedChange(): void {
    this.applyFiltersAndSort();
  }

  onSortChange(): void {
    this.applyFiltersAndSort();
  }

  // Clear filters
  clearAllFilters(): void {
    this.selectedCategory = '';
    this.selectedProvider = '';
    this.selectedPriceRange = '';
    this.verifiedOnly = false;
    this.applyFiltersAndSort();
  }

  clearFilter(filterType: string): void {
    switch (filterType) {
      case 'category':
        this.selectedCategory = '';
        break;
      case 'provider':
        this.selectedProvider = '';
        break;
      case 'price':
        this.selectedPriceRange = '';
        break;
      case 'verified':
        this.verifiedOnly = false;
        break;
    }
    this.applyFiltersAndSort();
  }

  // Navigation
  onNewSearch(): void {
    this.router.navigate(['/']);
  }

  onViewProduct(product: Product): void {
    // Navigate to product details page
    this.router.navigate(['/service-details', product.id], {
      queryParams: {
        id: product.id,
        title: product.title,
        price: product.price
      }
    });
  }

  onBookProduct(product: Product): void {
    // Navigate to booking URL or internal booking page
    if (product.bookingUrl) {
      window.open(product.bookingUrl, '_blank');
    } else {
      console.log('Booking product:', product);
      alert(`Booking ${product.title} - £${product.price}`);
    }
  }

  // Toggle filters panel
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  // Utility methods
  formatPrice(price: number | null): string {
    if (price === null) return 'Contact for price';
    return `£${price}`;
  }

  getDeliveryTypeLabel(locationType: string): string {
    switch (locationType) {
      case 'at-home': return 'At Home';
      case 'in-clinic': return 'In Clinic';
      case 'online': return 'Online';
      default: return 'Various';
    }
  }

  // New search bar methods
  initializeSearchBarOptions(): void {
    this.availableServices = [
      { 
        value: 'blood-test', 
        label: 'Blood Test',
        subOptions: [
          { value: 'general-health', label: 'General Health' },
          { value: 'vitamins', label: 'Vitamins' },
          { value: 'menopause', label: 'Menopause' },
          { value: 'female-fertility', label: 'Female Fertility' },
          { value: 'male-fertility', label: 'Male Fertility' },
          { value: 'erectile-dysfunction', label: 'Erectile Dysfunction' },
          { value: 'testosterone', label: 'Testosterone' },
          { value: 'thyroid', label: 'Thyroid' },
          { value: 'male-health', label: 'Male Health' },
          { value: 'female-health', label: 'Female Health' },
          { value: 'allergies-intolerances', label: 'Allergies & Intolerances' },
          { value: 'diabetes', label: 'Diabetes' },
          { value: 'cholesterol', label: 'Cholesterol' }
        ]
      },
      { 
        value: 'cancer-check', 
        label: 'Cancer Check',
        subOptions: [
          { value: 'thyroid-cancer', label: 'Thyroid Cancer' },
          { value: 'liver-cancer', label: 'Liver Cancer' },
          { value: 'lung-cancer', label: 'Lung Cancer' },
          { value: 'bowel-cancer', label: 'Bowel Cancer' },
          { value: 'skin-cancer', label: 'Skin Cancer' },
          { value: 'cervical-cancer', label: 'Cervical Cancer' },
          { value: 'ovarian-cancer', label: 'Ovarian Cancer' },
          { value: 'prostate-cancer', label: 'Prostate Cancer' },
          { value: 'breast-cancer', label: 'Breast Cancer' },
          { value: 'general-cancer', label: 'General Cancer Screening' }
        ]
      },
      {
        value: 'gp-appointment',
        label: 'GP Appointment',
        subOptions: [
          { value: 'general-appointment', label: 'General Appointment' }
        ]
      },
      {
        value: 'mri-scan',
        label: 'MRI Scan',
        subOptions: [
          { value: '1-body-part', label: '1 Body Part' },
          { value: '2-body-parts', label: '2 Body Parts' },
          { value: '3-body-parts', label: '3 Body Parts' },
          { value: 'full-body', label: 'Full Body' }
        ]
      },
      {
        value: 'sti-test',
        label: 'STI Test',
        subOptions: [
          { value: 'herpes-test', label: 'Herpes Test' },
          { value: 'syphilis-test', label: 'Syphilis Test' },
          { value: 'gonorrhea-test', label: 'Gonorrhea Test' },
          { value: 'chlamydia-test', label: 'Chlamydia Test' },
          { value: 'all-stis', label: 'All STIs' },
          { value: 'hepatitis-test', label: 'Hepatitis Test' },
          { value: 'hiv-test', label: 'HIV Test' }
        ]
      },
      {
        value: 'travel-vaccine',
        label: 'Travel Vaccine',
        subOptions: [
          { value: 'yellow-fever', label: 'Yellow Fever' },
          { value: 'typhoid', label: 'Typhoid' },
          { value: 'cholera', label: 'Cholera' },
          { value: 'meningitis', label: 'Meningitis' },
          { value: 'hepatitis-b', label: 'Hepatitis-B' },
          { value: 'rabies', label: 'Rabies' },
          { value: 'malaria', label: 'Malaria' }
        ]
      }
    ];

    // Set default sub-services for Blood Test
    this.availableSubServices = this.availableServices[0].subOptions || [];
  }

  initializeCurrentSearchValues(): void {
    // Set current search values in the new search bar
    this.newSearchService = this.searchService || 'blood-test';
    this.newSearchLocation = this.selectedLocation || '';
    this.newDeliveryType = this.selectedDeliveryType || 'at-home';
    
    // Update sub-services based on current service
    this.onNewServiceChange();
  }

  onNewServiceChange(): void {
    // Update sub-services when service changes
    const selectedService = this.availableServices.find(s => s.value === this.newSearchService);
    this.availableSubServices = selectedService?.subOptions || [];
    
    // Reset sub-service selection
    this.newSearchSubService = '';
  }

  useCurrentLocation(): void {
    this.isLoadingLocation = true;
    
    this.productsService.getCurrentLocation()
      .then((location: any) => {
        this.newSearchLocation = location.postcode || location.area;
        this.isLoadingLocation = false;
      })
      .catch(error => {
        console.error('Error getting location:', error);
        this.isLoadingLocation = false;
      });
  }

  performNewSearch(): void {
    // Navigate to search results with new parameters
    const queryParams: any = {
      service: this.newSearchService,
      locationType: this.newDeliveryType
    };
    
    if (this.newSearchSubService) {
      queryParams.subService = this.newSearchSubService;
    }
    
    if (this.newSearchLocation) {
      queryParams.location = this.newSearchLocation;
    }

    this.router.navigate(['/search-results'], {
      queryParams
    });
  }

  // Map view methods
  setViewMode(mode: 'list' | 'map'): void {
    this.viewMode = mode;
    
    if (mode === 'map') {
      // Initialize map after view change with Google Maps callback
      setTimeout(() => {
        if (window.addGoogleMapsCallback) {
          window.addGoogleMapsCallback(() => {
            this.initializeMap();
          });
        } else {
          // Fallback for older browsers or if callback system fails
          this.initializeMap();
        }
      }, 100);
    }
  }

  initializeMap(): void {
    // Check if Google Maps is available
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps not loaded');
      // Retry after a short delay
      setTimeout(() => {
        if (window.addGoogleMapsCallback) {
          window.addGoogleMapsCallback(() => {
            this.initializeMap();
          });
        }
      }, 1000);
      return;
    }

    // Check if map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container not found');
      return;
    }

    // Default center (London)
    const defaultCenter = { lat: 51.5074, lng: -0.1278 };
    
    try {
      // Initialize map
      this.map = new google.maps.Map(mapContainer, {
        zoom: 10,
        center: this.userLatLng || defaultCenter,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
      });

      // Add markers for products
      this.addProductMarkers();
      
      // Add user location marker if available
      if (this.userLatLng) {
        this.addUserLocationMarker();
      }
      
      console.log('Google Maps initialized successfully');
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
    }
  }

  addProductMarkers(): void {
    if (!this.map || typeof google === 'undefined' || !google.maps) {
      return;
    }

    try {
      // Clear existing markers
      this.markers.forEach(marker => {
        if (marker && marker.setMap) {
          marker.setMap(null);
        }
      });
      this.markers = [];

      this.filteredProducts.forEach((product, index) => {
        // Generate random coordinates near the center for demo
        // In real implementation, you'd get actual coordinates from the product data
        const lat = (this.userLatLng?.lat || 51.5074) + (Math.random() - 0.5) * 0.1;
        const lng = (this.userLatLng?.lng || -0.1278) + (Math.random() - 0.5) * 0.1;

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: this.map,
          title: product.title,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="white" stroke-width="2"/>
                <text x="20" y="26" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${index + 1}</text>
              </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20)
          }
        });

        // Add click listener
        marker.addListener('click', () => {
          this.selectProduct(index);
        });

        this.markers.push(marker);
      });

      // Fit map to show all markers
      if (this.markers.length > 0) {
        this.fitMapToMarkers();
      }
    } catch (error) {
      console.error('Error adding product markers:', error);
    }
  }

  addUserLocationMarker(): void {
    if (!this.userLatLng || !this.map || typeof google === 'undefined' || !google.maps) {
      return;
    }

    try {
      this.userLocationMarker = new google.maps.Marker({
        position: this.userLatLng,
        map: this.map,
        title: 'Your Location',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="12" fill="#ef4444" stroke="white" stroke-width="3"/>
              <circle cx="15" cy="15" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(30, 30),
          anchor: new google.maps.Point(15, 15)
        }
      });
    } catch (error) {
      console.error('Error adding user location marker:', error);
    }
  }

  selectProduct(index: number): void {
    this.selectedProductIndex = index;
    
    // Scroll to product in sidebar
    const productElement = document.querySelector(`.map-product-card:nth-child(${index + 1})`);
    if (productElement) {
      productElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Center map on selected marker
    if (this.markers[index]) {
      this.map.panTo(this.markers[index].getPosition());
    }
  }

  highlightMarker(index: number): void {
    if (this.markers[index]) {
      // Change marker icon to highlighted state
      this.markers[index].setIcon({
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <circle cx="22.5" cy="22.5" r="20" fill="#fbbf24" stroke="white" stroke-width="3"/>
            <text x="22.5" y="28" text-anchor="middle" fill="white" font-size="16" font-weight="bold">${index + 1}</text>
          </svg>
        `),
        scaledSize: new google.maps.Size(45, 45),
        anchor: new google.maps.Point(22.5, 22.5)
      });
    }
  }

  unhighlightMarker(index: number): void {
    if (this.markers[index] && this.selectedProductIndex !== index) {
      // Reset marker icon to normal state
      this.markers[index].setIcon({
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="white" stroke-width="2"/>
            <text x="20" y="26" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${index + 1}</text>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20)
      });
    }
  }

  centerMapOnUser(): void {
    if (this.userLatLng && this.map) {
      this.map.panTo(this.userLatLng);
      this.map.setZoom(12);
    } else {
      // Get user location
      this.getCurrentLocationForMap();
    }
  }

  getCurrentLocationForMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          if (this.map) {
            this.map.panTo(this.userLatLng);
            this.map.setZoom(12);
            this.addUserLocationMarker();
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }

  fitMapToMarkers(): void {
    if (!this.map || this.markers.length === 0 || typeof google === 'undefined' || !google.maps) {
      return;
    }

    try {
      const bounds = new google.maps.LatLngBounds();
      
      // Include all product markers
      this.markers.forEach(marker => {
        if (marker && marker.getPosition) {
          bounds.extend(marker.getPosition());
        }
      });
      
      // Include user location if available
      if (this.userLocationMarker && this.userLocationMarker.getPosition) {
        bounds.extend(this.userLocationMarker.getPosition());
      }

      this.map.fitBounds(bounds);
      
      // Ensure minimum zoom level
      google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
        if (this.map && this.map.getZoom && this.map.getZoom() > 15) {
          this.map.setZoom(15);
        }
      });
    } catch (error) {
      console.error('Error fitting map to markers:', error);
    }
  }
}
