// Updated navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  link?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  activeDropdown: string | null = null;

  constructor(private router: Router) {}

  menuItems: MenuItem[] = [
    {
      label: 'About',
      children: [
        { label: 'FAQs', link: '/faqs' },
        { label: 'Contact Us', link: '/contact' },
        // { label: 'Partners', link: '/partners' },
        { label: 'Partner With Us', link: '/partner' },
        { label: 'Our Mission', link: '/mission' },
        // { label: 'User Terms', link: '/user-terms' }
      ]
    },
    {
      label: 'Blood Tests',
      children: [
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
      label: 'Sexual Health Tests',
      children: [
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
      label: 'GP Appointments',
      children: [
        { label: 'Virtual Consultation', link: '/service/gp-appointment-virtual' },
        { 
          label: 'In-Clinic Consultation',
          children: [
            {
              label: 'GP London',
              children: [
                { label: 'GP Ken & Chel', link: '/service/gp-appointment-kensington-chelsea' },
                { label: 'GP Canary Wharf', link: '/service/gp-appointment-canary-wharf' },
                { label: 'GP Islington', link: '/service/gp-appointment-islington' },
                { label: 'GP Brixton', link: '/service/gp-appointment-brixton' },
                { label: 'GP Camden', link: '/service/gp-appointment-camden' },
                { label: 'GP Liverpool Street', link: '/service/gp-appointment-liverpool-street' },
                { label: 'GP Hammersmith', link: '/service/gp-appointment-hammersmith' },
                { label: 'GP London Bridge', link: '/service/gp-appointment-london-bridge' },
                { label: 'GP Paddington', link: '/service/gp-appointment-paddington' },
                { label: 'GP Oxford Street', link: '/service/gp-appointment-oxford-street' },
                { label: 'GP Chiswick', link: '/service/gp-appointment-chiswick' }
              ]
            },
            { label: 'GP Leeds', link: '/service/gp-appointment-leeds' },
            { label: 'GP Birmingham', link: '/service/gp-appointment-birmingham' },
            { label: 'GP Bristol', link: '/service/gp-appointment-bristol' },
            { label: 'GP Surrey', link: '/service/gp-appointment-surrey' },
            { label: 'GP Kent', link: '/service/gp-appointment-kent' },
            { label: 'GP Manchester', link: '/service/gp-appointment-manchester' },
            { label: 'GP Liverpool', link: '/service/gp-appointment-liverpool' },
            { label: 'GP Edinburgh', link: '/service/gp-appointment-edinburgh' },
            { label: 'GP Cardiff', link: '/service/gp-appointment-cardiff' },
            { label: 'GP Newcastle', link: '/service/gp-appointment-newcastle' },
            { label: 'GP Durham', link: '/service/gp-appointment-durham' },
            { label: 'GP Yorkshire', link: '/service/gp-appointment-yorkshire' },
            { label: 'GP Near Me', link: '/service/gp-appointment-near-me' },
            { label: 'Popular GP Locations', link: '/service/gp-appointment-popular' }
          ]
        }
      ]
    },
    {
      label: 'Travel Vaccinations',
      children: [
        { label: 'Destination Guide', link: '/service/destination-guide' },
        { label: 'Typhoid', link: '/service/typhoid' },
        { label: 'Rabies', link: '/service/rabies' },
        { label: 'Hepatitis B', link: '/service/hepatitis-b' },
        { label: 'Meningitis', link: '/service/meningitis' },
        { label: 'Cholera', link: '/service/cholera' },
        { label: 'Yellow Fever', link: '/service/yellow-fever' },
        { label: 'Malaria', link: '/service/malaria' }
      ]
    },
    {
      label: 'Health Hub',
      link: '/health-hub'
    }
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.activeDropdown = null;
    }
  }

  toggleDropdown(menuLabel: string): void {
    if (this.activeDropdown === menuLabel) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = menuLabel;
    }
  }

  closeDropdowns(): void {
    this.activeDropdown = null;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.activeDropdown = null;
  }

  // Navigate to service page
  navigateToService(link: string): void {
    if (link.startsWith('/service/')) {
      this.router.navigate([link]);
      this.closeMobileMenu();
    }
  }

  // Handle click on menu items
  onMenuItemClick(item: MenuItem): void {
    if (item.link) {
      this.navigateToService(item.link);
    }
  }
}