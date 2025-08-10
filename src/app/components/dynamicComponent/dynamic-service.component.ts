// dynamic-service.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { ProductsService, Product } from '../../services/products.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-service',
  templateUrl: '../dynamicComponent/dynamic-service.component.html',
  styleUrls: ['./dynamic-service.component.css'],
  standalone: false
})

export class DynamicServiceComponent implements OnInit, OnDestroy {
  serviceData: Product | null = null;
  serviceName: string = '';
  loading: boolean = true;
  error: string = '';
  deliveryOptions: { key: string, value: string }[] = [];
  selectedDelivery: string = '';
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    public router: Router, // Made public for template access
    private firebaseService: FirebaseService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.serviceName = params['serviceName'] || params['serviceId'];
      if (this.serviceName) {
        this.loadServiceData();
      } else {
        this.error = 'No service specified';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadServiceData(): void {
    this.loading = true;
    this.error = '';
    
    // Convert URL service name to Firebase document name
    const firebaseServiceName = this.convertUrlToFirebaseName(this.serviceName);
    
    // Try to get product from products service first
    this.productsService.getProductById(firebaseServiceName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Product | undefined) => {
          if (data) {
            this.serviceData = data;
            this.processDeliveryOptions();
            this.loading = false;
          } else {
            // If not found in products, try to fetch from 'service' collection directly
            this.fetchFromServiceCollection(firebaseServiceName);
          }
        },
        error: (err: any) => {
          console.error('Error fetching from products collection:', err);
          // Try service collection as fallback
          this.fetchFromServiceCollection(firebaseServiceName);
        }
      });
  }

  private fetchFromServiceCollection(serviceName: string): void {
    this.firebaseService.getServiceById(serviceName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data) {
            // Convert service data to Product format for compatibility
            this.serviceData = {
              id: serviceName,
              title: serviceName,
              description: data.description,
              category: this.getServiceCategory(),
              price: this.extractPriceFromString(data.price),
              delivery: Array.isArray(data.delivery) ? data.delivery : [data.delivery],
              locationType: data.delivery?.includes('At Home') ? 'at-home' : 'in-clinic',
              postcode: 'London', // Default
              tags: [serviceName.toLowerCase()],
              verified: true,
              providerName: 'HealthTestGenius',
              bookingUrl: '',
              timestamp: new Date().toISOString(),
              imageUrl: ''
            };
            this.processDeliveryOptions();
          } else {
            this.error = 'Service not found';
          }
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error fetching from service collection:', err);
          this.error = 'Failed to load service data';
          this.loading = false;
        }
      });
  }

  private extractPriceFromString(priceString: string): number | null {
    if (!priceString) return null;
    if (priceString.toLowerCase().includes('free') || priceString.toLowerCase() === 'free') return 0;
    if (priceString.toLowerCase().includes('custom') || priceString.toLowerCase().includes('contact')) return null;
    
    // Extract number from string like "£49.00" or "From £40.00"
    const match = priceString.match(/£?(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : null;
  }

  private convertUrlToFirebaseName(urlName: string): string {
    // Convert URL format to Firebase document name
    // Updated mapping to match exact Firebase service names
    const mappings: { [key: string]: string } = {
      // Blood Tests
      'cholesterol': 'Cholesterol',
      'diabetes': 'Diabetes',
      'allergies-intolerances': 'Allergies & Intolerances',
      'allergies-and-intolerances': 'Allergies & Intolerances',
      'thyroid': 'Thyroid',
      'menopause': 'Menopause',
      'female-fertility': 'Female Fertility',
      'erectile-dysfunction': 'Erectile Dysfunction',
      'male-fertility': 'Male Fertility',
      'wellman': 'Wellman',
      'wellwoman': 'Wellwoman',
      'vitamins': 'Vitamins',
      
      // STI Tests
      'general-sti-screening': 'General STI Screening',
      'sti-screening': 'General STI Screening',
      'chlamydia': 'Chlamydia',
      'syphilis': 'Syphilis',
      'hiv': 'HIV',
      'herpes': 'Herpes',
      'gonorrhoea': 'Gonorrhoea',
      'gonorrhea': 'Gonorrhoea',
      'hepatitis': 'Hepatitis',
      
      // Travel Vaccinations
      'destination-guide': 'Destination Guide',
      'typhoid': 'Typhoid',
      'rabies': 'Rabies',
      'hepatitis-b': 'Hepatitis B',
      'meningitis': 'Meningitis',
      'cholera': 'Cholera',
      'yellow-fever': 'Yellow Fever',
      'malaria': 'Malaria',
      
      // GP Appointments
      'virtual-consultation': 'Virtual Consultation',
      'gp-ken-chel': 'GP Ken & Chel',
      'gp-canary-wharf': 'GP Canary Wharf',
      'gp-islington': 'GP Islington',
      'gp-brixton': 'GP Brixton',
      'gp-camden': 'GP Camden',
      'gp-liverpool-street': 'GP Liverpool Street',
      'gp-hammersmith': 'GP Hammersmith',
      'gp-london-bridge': 'GP London Bridge',
      'gp-paddington': 'GP Paddington',
      'gp-oxford-street': 'GP Oxford Street',
      'gp-chiswick': 'GP Chiswick',
      'gp-leeds': 'GP Leeds',
      'gp-birmingham': 'GP Birmingham',
      'gp-bristol': 'GP Bristol',
      'gp-surrey': 'GP Surrey',
      'gp-kent': 'GP Kent',
      'gp-manchester': 'GP Manchester',
      'gp-liverpool': 'GP Liverpool',
      'gp-edinburgh': 'GP Edinburgh',
      'gp-cardiff': 'GP Cardiff',
      'gp-newcastle': 'GP Newcastle',
      'gp-durham': 'GP Durham',
      'gp-yorkshire': 'GP Yorkshire',
      'gp-near-me': 'GP Near Me',
      'popular-gp-locations': 'Popular GP Locations',
      
      // Health Services mappings (from home page) - Updated to match Firebase exactly
      'gp-appointments': 'GP Appointments',
      'blood-tests': 'Cholesterol', // Map to primary blood test service
      'cancer-checks': 'Cancer Checks',
      'sexual-health': 'General STI Screening', // Map to primary STI service
      'gynaecology': 'Gynaecology',
      'travel-vaccinations': 'Destination Guide', // Map to primary travel service
      'mri-ct-scans': 'MRI & CT Scans',
      'weight-loss': 'Weight Loss',
      'physiotherapy': 'Physiotherapy',
      'mental-health': 'Mental Health',
      'dentists': 'Dentists',
      'care-homes': 'Care Homes',
      'dermatology': 'Dermatology',
      'fertility-treatments': 'Female Fertility', // Map to primary fertility service
      
      // Legacy mappings for backward compatibility - Updated to match Firebase exactly
      'blood-test': 'Cholesterol',
      'ct-scan': 'MRI & CT Scans',
      'ct-scans': 'MRI & CT Scans',
      'cancer-check': 'Cancer Checks',
      'cancer-screening': 'Cancer Checks',
      'care-home': 'Care Homes',
      'dentist': 'Dentists',
      'dental': 'Dentists',
      'skin-care': 'Dermatology',
      'fertility-treatment': 'Female Fertility',
      'fertility': 'Female Fertility',
      'gp-appointment': 'GP Appointments',
      'general-practitioner': 'GP Appointments',
      'gynecology': 'Gynaecology',
      'womens-health': 'Gynaecology',
      'mri-scan': 'MRI & CT Scans',
      'mri-scans': 'MRI & CT Scans',
      'mri': 'MRI & CT Scans',
      'psychology': 'Mental Health',
      'physio': 'Physiotherapy',
      'physical-therapy': 'Physiotherapy',
      'sti-test': 'General STI Screening',
      'sti-tests': 'General STI Screening',
      'therapy': 'Mental Health',
      'counselling': 'Mental Health',
      'counseling': 'Mental Health'
    };

    // First try exact match
    if (mappings[urlName]) {
      return mappings[urlName];
    }

    // Then try partial matches for compound service names
    for (const [key, value] of Object.entries(mappings)) {
      if (urlName.includes(key)) {
        return value;
      }
    }

    // Finally, convert dashes to spaces and capitalize
    return this.capitalizeWords(urlName.replace(/-/g, ' '));
  }

  private capitalizeWords(str: string): string {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  private processDeliveryOptions(): void {
    if (this.serviceData?.delivery) {
      // Handle array format for delivery (our Product interface uses string[])
      if (Array.isArray(this.serviceData.delivery)) {
        this.deliveryOptions = this.serviceData.delivery.map((option: string, index: number) => ({
          key: `option-${index}`,
          value: option
        }));
      } else {
        // Fallback for object format
        this.deliveryOptions = Object.entries(this.serviceData.delivery).map(([key, value]) => ({
          key,
          value: String(value)
        }));
      }
      
      // Set default selection
      if (this.deliveryOptions.length > 0) {
        this.selectedDelivery = this.deliveryOptions[0].value;
      }
    }
  }

  onDeliveryChange(deliveryOption: string): void {
    this.selectedDelivery = deliveryOption;
  }

  navigateToSearchResults(deliveryType: string): void {
    // Navigate to search results with the current service and delivery type
    const queryParams: any = {
      service: this.getServiceCategory(),
      subService: this.getSubServiceName(),
      locationType: deliveryType === 'At Home' ? 'at-home' : 'in-clinic'
    };

    this.router.navigate(['/search-results'], {
      queryParams
    });
  }

  private getServiceCategory(): string {
    // Map service names to their main categories
    const serviceName = this.serviceName.toLowerCase();
    
    if (serviceName.includes('cholesterol') || serviceName.includes('diabetes') || 
        serviceName.includes('thyroid') || serviceName.includes('blood')) {
      return 'blood-test';
    } else if (serviceName.includes('sti') || serviceName.includes('sexual') || 
               serviceName.includes('chlamydia') || serviceName.includes('hiv')) {
      return 'sti-test';
    } else if (serviceName.includes('gp') || serviceName.includes('consultation')) {
      return 'gp-appointment';
    } else if (serviceName.includes('mri') || serviceName.includes('ct') || serviceName.includes('scan')) {
      return 'mri-scan';
    } else if (serviceName.includes('travel') || serviceName.includes('vaccine')) {
      return 'travel-vaccine';
    } else if (serviceName.includes('cancer')) {
      return 'cancer-check';
    }
    
    // Default fallback
    return 'blood-test';
  }

  private getSubServiceName(): string {
    // Extract the specific sub-service from the service name
    const serviceName = this.serviceName.toLowerCase();
    
    if (serviceName.includes('cholesterol')) return 'cholesterol';
    if (serviceName.includes('diabetes')) return 'diabetes';
    if (serviceName.includes('thyroid')) return 'thyroid';
    if (serviceName.includes('sti')) return 'all-stis';
    if (serviceName.includes('gp')) return 'general-appointment';
    if (serviceName.includes('mri')) return 'full-body';
    if (serviceName.includes('ct')) return 'full-body';
    
    // Default fallback
    return 'general-health';
  }

  bookService(): void {
    if (this.serviceData?.bookingUrl) {
      // Open external booking URL
      window.open(this.serviceData.bookingUrl, '_blank');
    } else {
      // Fallback booking action
      console.log('Booking service:', this.serviceData?.title);
      alert(`Booking ${this.serviceData?.title} for delivery: ${this.selectedDelivery}`);
    }
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  getFormattedPrice(): string {
    if (this.serviceData?.price === null) return 'Contact for price';
    if (this.serviceData?.price === 0) return 'Free';
    if (this.serviceData?.price) {
      // Format the price to show as £49.00 instead of £49
      return `£${this.serviceData.price.toFixed(2)}`;
    }
    return 'Price not available';
  }

  getServiceDisplayName(): string {
    return this.serviceData?.title || this.capitalizeWords(this.serviceName.replace(/-/g, ' '));
  }
}