import { Component } from '@angular/core';

interface Partner {
  name: string;
  logo: string;
  imagePath: string;
}

interface Testimonial {
  name: string;
  review: string;
  service: string;
  imagePath: string;
  date: string;
}

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
  standalone: false
})
export class PartnersComponent {
  partners: Partner[] = [
    { name: 'Boots', logo: 'BOOTS', imagePath: 'assets/images/boots.jpg' },
    { name: 'Fettle', logo: 'FETTLE', imagePath: 'assets/images/fettle.jpg' },
    { name: 'HB', logo: 'HB', imagePath: 'assets/images/hb.jpg' },
    { name: 'Smile Therapy', logo: 'SMILE', imagePath: 'assets/images/smile-therapy.jpg' },
    { name: 'Vista Health', logo: 'VISTA', imagePath: 'assets/images/vista-health.jpg' },
    { name: 'LSDC Healthcare', logo: 'LSDC', imagePath: 'assets/images/lsdc-heathcare.jpg' },
    { name: 'Bluecrest', logo: 'BLUECREST', imagePath: 'assets/images/bluecrest.jpg' }
  ];

  // Create extended list for scrolling animation
  allPartners: Partner[] = [
    ...this.partners,
    ...this.partners, // Duplicate for seamless scroll
    ...this.partners
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Anna',
      review: 'Booking online is quick and hassle-free, with flexible appointment times.',
      service: 'GP Appointments',
      imagePath: 'assets/images/anna.jpg',
      date: '13 Jan 2024'
    },
    {
      name: 'Fred',
      review: 'Fantastic service! I was able to compare blood test prices and book an appointment within minutes. The whole process was seamless and professional.',
      service: 'Blood Tests',
      imagePath: 'assets/images/fredd.jpg',
      date: '18 Dec 2023'
    },
    {
      name: 'Julia',
      review: 'The travel vaccination service was excellent. I got all my vaccines for my trip to Southeast Asia at competitive prices. Highly recommended!',
      service: 'Travel Vaccinations',
      imagePath: 'assets/images/julia.jpg',
      date: '5 Feb 2024'
    },
    {
      name: 'Tom',
      review: 'Booking my MRI scan was so much easier than going through the NHS. Quick, efficient, and transparent pricing. Will definitely use again.',
      service: 'Medical Scans',
      imagePath: 'assets/images/tom.jpg',
      date: '22 Jan 2024'
    }
  ];

  trackByPartner(index: number, partner: Partner): string {
    return partner.name;
  }
}
