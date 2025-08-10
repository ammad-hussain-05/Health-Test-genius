import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface ServiceData {
  name: string;
  description: string;
  price: string;
}

interface Provider {
  id: string;
  name: string;
  location: string;
  distance: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  reviews: number;
  features: string[];
  deliveryOptions: string[];
  availability: string[];
}

interface DeliveryType {
  value: string;
  label: string;
}

interface SortOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css'],
  standalone: false
})
export class ServiceDetailsComponent implements OnInit {
  
  serviceData: ServiceData = {
    name: 'Blood Test Service',
    description: 'Comprehensive blood testing services with quick results',
    price: 'From £45'
  };
  
  isLoading = false;
  selectedDeliveryType = 'all';
  selectedSortBy = 'rating';
  selectedLocation = '';
  
  deliveryTypes: DeliveryType[] = [
    { value: 'all', label: 'All Types' },
    { value: 'in-clinic', label: 'In-Clinic' },
    { value: 'home-visit', label: 'Home Visit' },
    { value: 'postal', label: 'Postal Kit' }
  ];
  
  sortOptions: SortOption[] = [
    { value: 'rating', label: 'Best Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'availability', label: 'Soonest Available' }
  ];
  
  providers: Provider[] = [
    {
      id: '1',
      name: 'Medichecks',
      location: 'London Bridge, London',
      distance: '0.8 miles',
      price: '£45',
      originalPrice: '£55',
      discount: '18% off',
      rating: 4.8,
      reviews: 2847,
      features: ['Same Day Results', 'Doctor Review', 'Free Consultation'],
      deliveryOptions: ['In-Clinic', 'Postal Kit'],
      availability: ['Today 2:00 PM', 'Tomorrow 9:00 AM', 'Wed 10:30 AM']
    },
    {
      id: '2',
      name: 'Thriva',
      location: 'Canary Wharf, London',
      distance: '1.2 miles',
      price: '£39',
      rating: 4.7,
      reviews: 1923,
      features: ['Expert Analysis', 'Health Dashboard', 'Trend Tracking'],
      deliveryOptions: ['Postal Kit', 'Home Visit'],
      availability: ['Today 4:00 PM', 'Tomorrow 11:00 AM', 'Thu 2:00 PM']
    },
    {
      id: '3',
      name: 'Nuffield Health',
      location: 'Harley Street, London',
      distance: '2.1 miles',
      price: '£89',
      rating: 4.9,
      reviews: 1456,
      features: ['Consultant Review', 'Comprehensive Report', 'Follow-up Included'],
      deliveryOptions: ['In-Clinic', 'Home Visit'],
      availability: ['Tomorrow 10:00 AM', 'Thu 9:30 AM', 'Fri 3:00 PM']
    },
    {
      id: '4',
      name: 'Bupa Health Clinics',
      location: 'Westminster, London',
      distance: '1.7 miles',
      price: '£65',
      rating: 4.6,
      reviews: 987,
      features: ['Quick Results', 'Online Portal', 'GP Referral'],
      deliveryOptions: ['In-Clinic', 'Postal Kit'],
      availability: ['Today 5:30 PM', 'Tomorrow 2:00 PM', 'Wed 11:00 AM']
    },
    {
      id: '5',
      name: 'Private Blood Tests UK',
      location: 'King\'s Cross, London',
      distance: '3.4 miles',
      price: '£35',
      rating: 4.5,
      reviews: 2134,
      features: ['Budget Friendly', 'Fast Processing', 'Email Results'],
      deliveryOptions: ['In-Clinic', 'Postal Kit', 'Home Visit'],
      availability: ['Tomorrow 1:00 PM', 'Wed 9:00 AM', 'Thu 4:00 PM']
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get service name from route parameters
    this.route.params.subscribe(params => {
      const serviceName = params['serviceName'];
      if (serviceName) {
        this.loadServiceData(serviceName);
      }
    });
  }

  loadServiceData(serviceName: string): void {
    // Convert service name to display format
    this.serviceData = {
      name: this.formatServiceName(serviceName),
      description: 'Professional healthcare service with trusted providers',
      price: 'From £35'
    };
  }

  formatServiceName(serviceName: string): string {
    return serviceName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  onBackToSearch(): void {
    this.router.navigate(['/']);
  }

  getFilteredProviders(): Provider[] {
    let filtered = [...this.providers];

    // Filter by delivery type
    if (this.selectedDeliveryType !== 'all') {
      const deliveryTypeMap: { [key: string]: string } = {
        'in-clinic': 'In-Clinic',
        'home-visit': 'Home Visit',
        'postal': 'Postal Kit'
      };
      
      const targetDelivery = deliveryTypeMap[this.selectedDeliveryType];
      if (targetDelivery) {
        filtered = filtered.filter(provider => 
          provider.deliveryOptions.includes(targetDelivery)
        );
      }
    }

    // Filter by location if specified
    if (this.selectedLocation.trim()) {
      filtered = filtered.filter(provider =>
        provider.location.toLowerCase().includes(this.selectedLocation.toLowerCase())
      );
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (this.selectedSortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return this.extractPrice(a.price) - this.extractPrice(b.price);
        case 'price-high':
          return this.extractPrice(b.price) - this.extractPrice(a.price);
        case 'distance':
          return this.extractDistance(a.distance) - this.extractDistance(b.distance);
        default:
          return 0;
      }
    });

    return filtered;
  }

  private extractPrice(priceString: string): number {
    const match = priceString.match(/£(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  private extractDistance(distanceString: string): number {
    const match = distanceString.match(/([\d.]+)\s*miles?/);
    return match ? parseFloat(match[1]) : 0;
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= Math.floor(rating));
    }
    return stars;
  }

  onBookProvider(provider: Provider): void {
    // Navigate to booking with provider details
    console.log('Booking provider:', provider);
    // You can navigate to a booking page or open a modal
    alert(`Booking ${provider.name} - ${provider.price}`);
    
    // Example navigation to booking page:
    // this.router.navigate(['/book'], { 
    //   queryParams: { 
    //     provider: provider.id,
    //     service: this.serviceData.name,
    //     price: provider.price
    //   }
    // });
  }
} 