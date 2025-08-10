import { Component } from '@angular/core';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
  backgroundImage: string;
}

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css'],
  standalone: false
})
export class HowItWorksComponent {
  steps: Step[] = [
    {
      number: 1,
      title: 'Search treatments',
      description: 'Filter your search based on location, price, and service type to find the right solution for you.',
      icon: '🔍',
      backgroundImage: 'assets/images/search-treatments.jpg'
    },
    {
      number: 2,
      title: 'Compare options',
      description: 'Find services that suit your symptoms, budget, and location and compare them against each other in minutes.',
      icon: '📊',
      backgroundImage: 'assets/images/compare-options.jpg'
    },
    {
      number: 3,
      title: 'Book your treatment',
      description: 'Book your service or treatment with our trusted partners and receive results to your phone – it\'s that simple.',
      icon: '📱',
      backgroundImage: 'assets/images/book-your-treatment.jpg'
    }
  ];
}
