import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface HealthService {
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-health-services',
  templateUrl: './health-services.component.html',
  styleUrls: ['./health-services.component.css'],
  standalone: false
})
export class HealthServicesComponent {
  constructor(private router: Router) {}

  services: HealthService[] = [
    {
      name: 'GP Appointments',
      icon: 'fas fa-user-md',
      description: 'Book appointments with qualified general practitioners'
    },
    {
      name: 'Blood Tests',
      icon: 'fas fa-tint',
      description: 'Comprehensive blood testing services'
    },
    {
      name: 'Cancer Checks',
      icon: 'fas fa-search-plus',
      description: 'Early detection and screening services'
    },
    {
      name: 'Sexual Health',
      icon: 'fas fa-heart',
      description: 'Confidential sexual health testing and advice'
    },
    {
      name: 'Gynaecology',
      icon: 'fas fa-venus',
      description: 'Women\'s health and gynecological services'
    },
    {
      name: 'Travel Vaccinations',
      icon: 'fas fa-plane',
      description: 'Essential vaccinations for international travel'
    },
    {
      name: 'MRI | CT Scans',
      icon: 'fas fa-file-medical',
      description: 'Advanced medical imaging and diagnostics'
    },
    {
      name: 'Weight Loss',
      icon: 'fas fa-weight',
      description: 'Professional weight management programs'
    },
    {
      name: 'Physiotherapy',
      icon: 'fas fa-dumbbell',
      description: 'Physical therapy and rehabilitation services'
    },
    {
      name: 'Mental Health',
      icon: 'fas fa-brain',
      description: 'Mental health support and counseling'
    },
    {
      name: 'Dentists',
      icon: 'fas fa-tooth',
      description: 'Dental care and oral health services'
    },
    {
      name: 'Care Homes',
      icon: 'fas fa-home',
      description: 'Residential care and support services'
    },
    {
      name: 'Dermatology',
      icon: 'fas fa-eye',
      description: 'Skin health and dermatological treatments'
    },
    {
      name: 'Fertility Treatments',
      icon: 'fas fa-baby',
      description: 'Fertility testing and treatment options'
    }
  ];

  // Method to handle service click and navigate to service details
  onServiceClick(service: HealthService): void {
    // Convert service name to URL-friendly format
    const serviceUrl = this.convertServiceNameToUrl(service.name);
    
    // Navigate to the dynamic service component
    this.router.navigate(['/service', serviceUrl]);
  }

  // Convert service name to URL format (similar to navbar implementation)
  private convertServiceNameToUrl(serviceName: string): string {
    // Specific mappings for health services
    const mappings: { [key: string]: string } = {
      'GP Appointments': 'gp-appointments',
      'Blood Tests': 'blood-tests',
      'Cancer Checks': 'cancer-checks',
      'Sexual Health': 'sexual-health',
      'Gynaecology': 'gynaecology',
      'Travel Vaccinations': 'travel-vaccinations',
      'MRI | CT Scans': 'mri-ct-scans',
      'Weight Loss': 'weight-loss',
      'Physiotherapy': 'physiotherapy',
      'Mental Health': 'mental-health',
      'Dentists': 'dentists',
      'Care Homes': 'care-homes',
      'Dermatology': 'dermatology',
      'Fertility Treatments': 'fertility-treatments'
    };

    // Return mapped URL or convert to lowercase with dashes
    return mappings[serviceName] || serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
}
