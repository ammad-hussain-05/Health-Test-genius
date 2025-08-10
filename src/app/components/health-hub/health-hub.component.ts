import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-hub',
  templateUrl: './health-hub.component.html',
  styleUrls: ['./health-hub.component.css'],
  standalone: false
})
export class HealthHubComponent implements OnInit {

  // Latest articles data
  latestArticles = [
    {
      title: 'Understanding Cholesterol Levels and Heart Health',
      excerpt: 'Learn about different types of cholesterol and how they affect your cardiovascular health...',
      category: 'Heart Health',
      author: 'Dr. Sarah Johnson',
      date: 'Dec 14, 2024',
      readTime: '6 min read',
      icon: 'fas fa-heartbeat'
    },
    {
      title: 'The Importance of Regular Blood Pressure Monitoring',
      excerpt: 'Discover why monitoring your blood pressure regularly is crucial for preventing serious health conditions...',
      category: 'Prevention',
      author: 'Dr. Emily Rodriguez',
      date: 'Dec 13, 2024',
      readTime: '5 min read',
      icon: 'fas fa-tint'
    },
    {
      title: 'Mental Health and Physical Wellness Connection',
      excerpt: 'Explore the strong connection between mental health and physical well-being...',
      category: 'Mental Health',
      author: 'Dr. James Mitchell',
      date: 'Dec 11, 2024',
      readTime: '7 min read',
      icon: 'fas fa-brain'
    },
    {
      title: 'Nutrition Guidelines for Optimal Health',
      excerpt: 'Evidence-based nutrition recommendations to support your overall health and wellness...',
      category: 'Nutrition',
      author: 'Dr. Lisa Wang',
      date: 'Dec 9, 2024',
      readTime: '8 min read',
      icon: 'fas fa-apple-alt'
    },
    {
      title: 'Understanding Diabetes Risk Factors',
      excerpt: 'Learn about the key risk factors for diabetes and how to prevent or manage the condition...',
      category: 'Prevention',
      author: 'Dr. Michael Chen',
      date: 'Dec 7, 2024',
      readTime: '6 min read',
      icon: 'fas fa-pills'
    },
    {
      title: 'Women\'s Health: Essential Screenings by Age',
      excerpt: 'A comprehensive guide to important health screenings for women at different life stages...',
      category: 'Women\'s Health',
      author: 'Dr. Sarah Johnson',
      date: 'Dec 5, 2024',
      readTime: '9 min read',
      icon: 'fas fa-venus'
    }
  ];

  // Health categories data
  healthCategories = [
    {
      name: 'Heart Health',
      title: 'Heart Health',
      description: 'Comprehensive cardiovascular health information and screening options',
      icon: 'fas fa-heartbeat',
      articleCount: 45,
      lastUpdated: 'today'
    },
    {
      name: 'Mental Health',
      title: 'Mental Health',
      description: 'Mental wellness resources and psychological health assessments',
      icon: 'fas fa-brain',
      articleCount: 38,
      lastUpdated: 'yesterday'
    },
    {
      name: 'Blood Tests',
      title: 'Blood Tests',
      description: 'Understanding blood work and laboratory test results',
      icon: 'fas fa-tint',
      articleCount: 52,
      lastUpdated: '2 days ago'
    },
    {
      name: 'Women\'s Health',
      title: 'Women\'s Health',
      description: 'Specialized health information for women of all ages',
      icon: 'fas fa-female',
      articleCount: 41,
      lastUpdated: 'today'
    },
    {
      name: 'Nutrition',
      title: 'Nutrition',
      description: 'Dietary guidance and nutritional health insights',
      icon: 'fas fa-apple-alt',
      articleCount: 36,
      lastUpdated: '3 days ago'
    },
    {
      name: 'Prevention',
      title: 'Prevention',
      description: 'Preventive care and early detection strategies',
      icon: 'fas fa-shield-alt',
      articleCount: 29,
      lastUpdated: 'yesterday'
    },
    {
      name: 'Diabetes Care',
      title: 'Diabetes Care',
      description: 'Diabetes management and blood sugar monitoring',
      icon: 'fas fa-syringe',
      articleCount: 33,
      lastUpdated: 'today'
    },
    {
      name: 'Cancer Screening',
      title: 'Cancer Screening',
      description: 'Early detection and cancer prevention information',
      icon: 'fas fa-microscope',
      articleCount: 27,
      lastUpdated: '4 days ago'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  // Navigation methods
  scrollToArticles(): void {
    const element = document.getElementById('articles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToCategories(): void {
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Search and filter methods
  onSearch(query?: string): void {
    // Search functionality
    console.log('Searching for:', query || 'general search');
  }

  filterByCategory(category: string): void {
    // Filter articles by category
    console.log('Filtering by category:', category);
  }

  readArticle(article: any): void {
    // Navigate to article detail
    console.log('Reading article:', article.title);
  }

  loadMoreArticles(): void {
    // Load more articles
    console.log('Loading more articles...');
  }

  subscribeToNewsletter(): void {
    // Newsletter subscription logic
    console.log('Newsletter subscription requested');
  }

  // TrackBy functions for better performance
  trackByArticle(index: number, article: any): any {
    return article.title || index;
  }

  trackByCategory(index: number, category: any): any {
    return category.name || index;
  }

} 