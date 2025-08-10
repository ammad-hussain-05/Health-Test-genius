import { Component } from '@angular/core';

interface Partner {
  name: string;
  logo: string;
  description: string;
  services: string[];
  website: string;
}

@Component({
  selector: 'app-partners-page',
  templateUrl: './partners-page.component.html',
  styleUrls: ['./partners-page.component.css'],
  standalone: false
})
export class PartnersPageComponent {
  
  partners: Partner[] = [
    {
      name: 'Thriva',
      logo: 'THRIVA',
      description: 'Leading provider of at-home blood tests with quick results and expert guidance.',
      services: ['Blood Tests', 'Health Monitoring', 'Vitamin Testing'],
      website: 'https://thriva.co'
    },
    {
      name: 'Medichecks',
      logo: 'MEDICHECKS',
      description: 'Comprehensive health testing with over 400 different tests available.',
      services: ['Blood Tests', 'Health Screenings', 'Disease Monitoring'],
      website: 'https://medichecks.com'
    },
    {
      name: 'Nuffield Health',
      logo: 'NUFFIELD',
      description: 'UK\'s largest healthcare charity providing diagnostic and treatment services.',
      services: ['Health Assessments', 'Medical Imaging', 'Specialist Care'],
      website: 'https://nuffieldhealth.com'
    },
    {
      name: 'Bupa',
      logo: 'BUPA',
      description: 'International healthcare group offering health insurance and medical services.',
      services: ['Health Insurance', 'Health Assessments', 'Specialist Treatments'],
      website: 'https://bupa.co.uk'
    },
    {
      name: 'Spire Healthcare',
      logo: 'SPIRE',
      description: 'Leading independent hospital group in the UK with comprehensive medical services.',
      services: ['Surgical Procedures', 'Diagnostic Imaging', 'Specialist Consultations'],
      website: 'https://spirehealthcare.com'
    },
    {
      name: 'BMI Healthcare',
      logo: 'BMI',
      description: 'UK\'s largest private hospital group providing high-quality healthcare.',
      services: ['Private Healthcare', 'Surgical Services', 'Diagnostic Tests'],
      website: 'https://bmihealthcare.co.uk'
    }
  ];

  stats = [
    { number: '200+', label: 'Partner Clinics' },
    { number: '50+', label: 'Service Types' },
    { number: '100K+', label: 'Appointments Booked' },
    { number: '99%', label: 'Partner Satisfaction' }
  ];

  benefits = [
    {
      title: 'Quality Assurance',
      description: 'All partners are CQC registered and meet our strict quality standards.',
      icon: '✅'
    },
    {
      title: 'Transparent Pricing',
      description: 'Clear, upfront pricing with no hidden fees or surprise charges.',
      icon: '💰'
    },
    {
      title: 'Easy Booking',
      description: 'Simple online booking system with instant confirmation.',
      icon: '📅'
    },
    {
      title: 'Customer Support',
      description: '24/7 support to help you every step of the way.',
      icon: '🎧'
    }
  ];
} 