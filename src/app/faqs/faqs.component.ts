import { Component } from '@angular/core';

interface FAQ {
  question: string;
  answer: string;
  category: string;
  isOpen?: boolean;
}

interface Category {
  name: string;
  count: number;
}

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css'],
  standalone: false
})
export class FaqsComponent {
  
  searchTerm: string = '';
  selectedCategory: string = 'All Questions';
  
  faqs: FAQ[] = [
    // General Questions
    {
      question: "What is Health Test Guru?",
      answer: "Health Test Guru is a comprehensive platform that helps you find, compare, and book healthcare services including blood tests, GP appointments, medical scans, and more. We partner with trusted healthcare providers to offer transparent pricing and easy booking.",
      category: "General",
      isOpen: false
    },
    {
      question: "How do I book a health test?",
      answer: "Simply search for the service you need, compare options based on price and location, select your preferred provider, and book online. You'll receive confirmation and all necessary details via email.",
      category: "General",
      isOpen: false
    },
    {
      question: "Are the healthcare providers verified?",
      answer: "Yes, all our partner healthcare providers are fully regulated and certified. We only work with CQC-registered clinics and qualified healthcare professionals.",
      category: "General",
      isOpen: false
    },
    {
      question: "What areas do you cover?",
      answer: "We currently cover major cities across the UK including London, Manchester, Birmingham, Leeds, Bristol, and many more. Our network is constantly expanding to serve more locations.",
      category: "General",
      isOpen: false
    },
    
    // Booking & Payments
    {
      question: "How do I pay for my appointment?",
      answer: "We accept all major credit and debit cards. Payment is processed securely through our platform when you confirm your booking. We use industry-standard encryption to protect your financial information.",
      category: "Booking",
      isOpen: false
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment up to 24 hours before your scheduled time. Please check your booking confirmation email for specific terms. Some providers may have different cancellation policies.",
      category: "Booking",
      isOpen: false
    },
    {
      question: "Do I need a referral from my GP?",
      answer: "Most of our services don't require a GP referral. You can book directly through our platform. However, some specialized services may require a referral. This will be clearly indicated during the booking process.",
      category: "Booking",
      isOpen: false
    },
    {
      question: "Can I book for someone else?",
      answer: "Yes, you can book appointments for family members or dependents. You'll need to provide their details during the booking process and ensure you have their consent.",
      category: "Booking",
      isOpen: false
    },
    {
      question: "What happens if I'm late for my appointment?",
      answer: "Please arrive on time for your appointment. If you're running late, contact the provider directly. They may be able to accommodate you, but this depends on their schedule and availability.",
      category: "Booking",
      isOpen: false
    },
    
    // Test Results
    {
      question: "How long do test results take?",
      answer: "Results timing varies by test type. Blood tests typically take 1-3 working days, while imaging scans may take 1-2 weeks. You'll receive results securely via email or patient portal.",
      category: "Results",
      isOpen: false
    },
    {
      question: "Can I access my results online?",
      answer: "Yes, you'll receive a secure link to access your results online. Some providers also offer patient portals where you can view all your test history and download reports.",
      category: "Results",
      isOpen: false
    },
    {
      question: "What if my results show something concerning?",
      answer: "If your results require medical attention, the healthcare provider will contact you directly. We recommend discussing all results with your GP or the testing clinic for proper interpretation and next steps.",
      category: "Results",
      isOpen: false
    },
    {
      question: "Can I get a copy of my results for my GP?",
      answer: "Absolutely. You can download and share your results with your GP or any other healthcare provider. Most results come in a format that's easily shareable with other medical professionals.",
      category: "Results",
      isOpen: false
    },
    
    // Privacy & Security
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data protection seriously. All personal and medical information is encrypted and stored securely in compliance with GDPR and NHS data protection standards. We use advanced security measures to protect your privacy.",
      category: "Privacy",
      isOpen: false
    },
    {
      question: "Who has access to my test results?",
      answer: "Only you and the healthcare provider conducting your test have access to your results. We never share your medical information with third parties without your explicit consent.",
      category: "Privacy",
      isOpen: false
    },
    {
      question: "How long do you keep my data?",
      answer: "We retain your data in accordance with healthcare regulations and GDPR requirements. Medical records are typically kept for 7-10 years, while booking information may be retained for shorter periods.",
      category: "Privacy",
      isOpen: false
    },
    
    // Pricing
    {
      question: "Are your prices all-inclusive?",
      answer: "Yes, our displayed prices include the test cost and basic consultation. Additional services like detailed reports or follow-up consultations may incur extra charges, which will be clearly stated before booking.",
      category: "Pricing",
      isOpen: false
    },
    {
      question: "Do you offer any discounts?",
      answer: "We occasionally offer promotional discounts and have packages for multiple tests. Sign up for our newsletter to be notified of special offers. We also offer corporate packages for businesses.",
      category: "Pricing",
      isOpen: false
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Refund policies vary by provider and service type. Generally, refunds are available if you cancel within the specified timeframe. Please review the terms and conditions for each booking.",
      category: "Pricing",
      isOpen: false
    },
    {
      question: "Do you accept insurance?",
      answer: "Most of our services are private pay, but some providers may accept certain insurance plans. Check with the specific provider during booking to see if your insurance is accepted.",
      category: "Pricing",
      isOpen: false
    }
  ];

  get categories(): Category[] {
    const categoryNames = ['All Questions', 'General', 'Booking', 'Results', 'Privacy', 'Pricing'];
    return categoryNames.map(name => ({
      name,
      count: name === 'All Questions' ? this.faqs.length : this.faqs.filter(faq => faq.category === name).length
    }));
  }

  get filteredFaqs(): FAQ[] {
    let filtered = this.faqs;
    
    // Filter by category
    if (this.selectedCategory !== 'All Questions') {
      filtered = filtered.filter(faq => faq.category === this.selectedCategory);
    }
    
    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchLower) ||
        faq.answer.toLowerCase().includes(searchLower) ||
        faq.category.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }

  toggleFaq(faq: FAQ): void {
    faq.isOpen = !faq.isOpen;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    // Close all open FAQs when switching categories
    this.faqs.forEach(faq => faq.isOpen = false);
  }

  onSearch(): void {
    // Close all open FAQs when searching
    this.faqs.forEach(faq => faq.isOpen = false);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.selectedCategory = 'All Questions';
    this.faqs.forEach(faq => faq.isOpen = false);
  }

  trackByFaq(index: number, faq: FAQ): string {
    return faq.question;
  }
} 