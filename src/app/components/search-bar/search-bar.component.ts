import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, LocationData } from '../../services/products.service';

interface SubOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: false
})
export class SearchBarComponent implements OnInit {
  selectedService = '';
  selectedLocation = '';
  selectedDeliveryType = 'at-home';
  selectedSubOption = '';
  userLocation = '';
  isUsingLocation = false;
  isLoadingLocation = false;
  
  // Health service categories from Compare Health Tests
  healthServices: any[] = [];
  subOptions: SubOption[] = [];
  
  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.initializeHealthServices();
  }

  initializeHealthServices(): void {
    this.healthServices = [
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
          { value: 'endometrial-cancer', label: 'Endometrial / Uterine Cancer' },
          { value: 'prostate-cancer', label: 'Prostate Cancer' },
          { value: 'breast-cancer', label: 'Breast Cancer' },
          { value: 'general-cancer', label: 'General Cancer Screening' }
        ]
      },
      {
        value: 'care-homes',
        label: 'Care Homes',
        subOptions: [
          { value: 'respite-care', label: 'Respite Care' },
          { value: 'dementia-care', label: 'Dementia Care' },
          { value: 'residential-care', label: 'Residential Care' },
          { value: 'all-care-homes', label: 'All Care Homes' },
          { value: 'nursing', label: 'Nursing' }
        ]
      },
      {
        value: 'ct-scan',
        label: 'CT Scan',
        subOptions: [
          { value: 'full-body', label: 'Full Body' },
          { value: '1-body-part', label: '1 Body Part' },
          { value: '2-body-parts', label: '2 Body Parts' },
          { value: '3-body-parts', label: '3 body Parts' }
        ]
      },
      {
        value: 'dentists',
        label: 'Dentists'
      },
      {
        value: 'dermatology',
        label: 'Dermatology'
      },
      {
        value: 'fertility-treatments',
        label: 'Fertility Treatments',
        subOptions: [
          { value: 'medicines', label: 'Medicines' },
          { value: 'surgical-procedures', label: 'Surgical Procedures' },
          { value: 'ivf', label: 'IVF' },
          { value: 'egg-freezing', label: 'Egg Freezing' }
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
        value: 'gynaecology',
        label: 'Gynaecology',
        subOptions: [
          { value: 'biopsy', label: 'Biopsy' },
          { value: 'scan', label: 'Scan' },
          { value: 'general-appointment', label: 'General Appointment' }
        ]
      },
      {
        value: 'mental-health',
        label: 'Mental Health'
      },
      {
        value: 'mri-scan',
        label: 'MRI Scan',
        subOptions: [
          { value: '3-body-parts', label: '3 body Parts' },
          { value: '1-body-part', label: '1 Body Part' },
          { value: 'full-body', label: 'Full Body' },
          { value: '2-body-parts', label: '2 Body Parts' }
        ]
      },
      {
        value: 'physiotherapy',
        label: 'Physiotherapy'
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
          { value: 'hiv-test', label: 'HIV Test' },
          { value: 'trichomoniasis-test', label: 'Trichomoniasis Test' }
        ]
      },
      {
        value: 'therapy',
        label: 'Therapy'
      },
      {
        value: 'travel-vaccine',
        label: 'Travel Vaccine',
        subOptions: [
          { value: 'yellow-fever', label: 'Yellow Fever' },
          { value: 'typhoid', label: 'Typhoid' },
          { value: 'cholera', label: 'Cholera' },
          { value: 'meningititis', label: 'Meningititis' },
          { value: 'hepatitis-b', label: 'Hepatitis-B' },
          { value: 'rabies', label: 'Rabies' },
          { value: 'maleria', label: 'Maleria' },
          { value: 'tetanus', label: 'Tetanus' },
          { value: 'polio', label: 'Polio' },
          { value: 'tuberculosis', label: 'Tuberculosis' },
          { value: 'tick-borne-encephalitis', label: 'Tick-Borne Encephalitis' }
        ]
      },
      {
        value: 'weight-loss-treatment',
        label: 'Weight Loss Treatment',
        subOptions: [
          { value: 'wegovy', label: 'Wegovy' },
          { value: 'mounjaro', label: 'Mounjaro' }
        ]
      }
    ];
  }

  onServiceChange(): void {
    // Reset sub-option when service changes and update sub-options
    const selectedServiceData = this.healthServices.find(s => s.value === this.selectedService);
    this.subOptions = selectedServiceData?.subOptions || [];
  }

  getSubOptionPlaceholder(): string {
    if (!this.selectedService) return 'Select a service first';
    
    const serviceLabels: { [key: string]: string } = {
      'blood-test': 'What do you want to test for?',
      'cancer-check': 'Which cancer do you want to test for?',
      'care-homes': 'Do you need specialist care?',
      'ct-scan': 'How many body parts?',
      'fertility-treatments': 'Which type of care are you looking for?',
      'gp-appointment': 'Virtual or In-person appointment?',
      'gynaecology': 'Which type of treatment are you looking for?',
      'mri-scan': 'How many body parts?',
      'sti-test': 'What kind of STI Test do you need?',
      'travel-vaccine': 'Which vaccine do you need?',
      'weight-loss-treatment': 'Which treatment would you like?'
    };
    
    return serviceLabels[this.selectedService] || 'Select option';
  }

  useCurrentLocation(): void {
    this.isLoadingLocation = true;
    
    this.productsService.getCurrentLocation()
      .then((location: LocationData) => {
        this.userLocation = `${location.area}, ${location.city}`;
        this.selectedLocation = location.postcode;
        this.isLoadingLocation = false;
      })
      .catch(error => {
        console.error('Error getting location:', error);
        this.userLocation = 'Unable to get location';
        this.isLoadingLocation = false;
      });
  }

  searchTreatments(): void {
    if (!this.selectedService) {
      alert('Please select a service');
      return;
    }

    // Navigate to search results with all parameters
    const queryParams: any = {
      service: this.selectedService,
      locationType: this.selectedDeliveryType
    };
    
    if (this.subOptions.length > 0 && !this.subOptions.find(opt => opt.value === '')) {
      queryParams.subService = this.subOptions[0]?.value || '';
    }
    
    if (this.selectedLocation) {
      queryParams.location = this.selectedLocation;
    }
    
    if (this.userLocation) {
      queryParams.userLocation = this.userLocation;
    }

    this.router.navigate(['/search-results'], {
      queryParams
    });
  }

  onSearch(): void {
    this.searchTreatments();
  }
} 