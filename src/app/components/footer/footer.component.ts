import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface FooterLink {
  label: string;
  link: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: false
})
export class FooterComponent {
  constructor(private router: Router) {}

  footerSections: FooterSection[] = [
    {
      title: 'Blood Tests',
      links: [
        { label: 'Cholesterol', link: '/service/cholesterol' },
        { label: 'Diabetes', link: '/service/diabetes' },
        { label: 'Allergies & Intolerances', link: '/service/allergies-intolerances' },
        { label: 'Thyroid', link: '/service/thyroid' },
        { label: 'Menopause', link: '/service/menopause' },
        { label: 'Female Fertility', link: '/service/female-fertility' },
        { label: 'Erectile Dysfunction', link: '/service/erectile-dysfunction' },
        { label: 'Male Fertility', link: '/service/male-fertility' },
        { label: 'Wellman', link: '/service/wellman' },
        { label: 'Wellwoman', link: '/service/wellwoman' },
        { label: 'Vitamins', link: '/service/vitamins' }
      ]
    },
    {
      title: 'Sexual Health Tests',
      links: [
        { label: 'General STI Screening', link: '/service/general-sti-screening' },
        { label: 'Chlamydia', link: '/service/chlamydia' },
        { label: 'Syphilis', link: '/service/syphilis' },
        { label: 'HIV', link: '/service/hiv' },
        { label: 'Herpes', link: '/service/herpes' },
        { label: 'Gonorrhoea', link: '/service/gonorrhoea' },
        { label: 'Hepatitis', link: '/service/hepatitis' }
      ]
    },
    {
      title: 'GP Appointments',
      links: [
        { label: 'Virtual Consultation', link: '/service/gp-appointment-virtual' },
        { label: 'GP London', link: '/service/gp-appointment-london' },
        { label: 'GP Birmingham', link: '/service/gp-appointment-birmingham' },
        { label: 'GP Manchester', link: '/service/gp-appointment-manchester' },
        { label: 'GP Leeds', link: '/service/gp-appointment-leeds' },
        { label: 'GP Bristol', link: '/service/gp-appointment-bristol' },
        { label: 'GP Liverpool', link: '/service/gp-appointment-liverpool' },
        { label: 'GP Edinburgh', link: '/service/gp-appointment-edinburgh' },
        { label: 'GP Cardiff', link: '/service/gp-appointment-cardiff' },
        { label: 'Popular GP Locations', link: '/service/gp-appointment-popular' }
      ]
    },
    {
      title: 'Travel Vaccinations',
      links: [
        { label: 'Destination Guide', link: '/service/destination-guide' },
        { label: 'Typhoid', link: '/service/typhoid' },
        { label: 'Yellow Fever', link: '/service/yellow-fever' },
        { label: 'Malaria', link: '/service/malaria' },
        { label: 'Rabies', link: '/service/rabies' },
        { label: 'Hepatitis B', link: '/service/hepatitis-b' },
        { label: 'Meningitis', link: '/service/meningitis' },
        { label: 'Cholera', link: '/service/cholera' }
      ]
    },
    {
      title: 'Help & Advice',
      links: [
        { label: 'Health Hub', link: '/health-hub' },
        { label: 'About Us', link: '/about' },
        { label: 'FAQs', link: '/faqs' },
        { label: 'Contact Us', link: '/contact' },
        { label: 'Partners', link: '/partners' },
        { label: 'Partner With Us', link: '/partner' },
        { label: 'Our Mission', link: '/mission' },
        { label: 'User Terms', link: '/user-terms' },
        { label: 'Privacy Policy', link: '/privacy' }
      ]
    }
  ];

  currentYear = new Date().getFullYear();

  // Navigate to service page
  navigateToService(link: string): void {
    this.router.navigate([link]);
  }
}
