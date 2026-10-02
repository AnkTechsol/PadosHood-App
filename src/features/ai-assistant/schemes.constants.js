export const schemes = [
  { id: 1, name: 'PMAY Housing', keywords: ['pmay', 'housing', 'ghar', 'house', 'awas'], description: 'Pradhan Mantri Awas Yojana for affordable housing.', eligibility: ['annual income < 3L for EWS', '3-6L for LIG'], documents: ['Aadhaar', 'income certificate', 'bank account', 'land documents'], marathi_name: 'प्रधानमंत्री आवास योजना' },
  { id: 2, name: 'Student Scholarship', keywords: ['scholarship', 'shishyavrutti', 'education', 'fees'], description: 'Government scholarship for higher education.', eligibility: ['Maharashtra domicile', 'family income < 1L', '60%+ marks'], documents: ['marksheet', 'income cert', 'caste cert', 'bank passbook'], marathi_name: 'विद्यार्थी शिष्यवृत्ती' },
  { id: 3, name: 'Senior Citizen Pension Indira Gandhi IGNOAPS', keywords: ['pension', 'senior', 'old', 'vruddhapkaal'], description: 'Monthly pension scheme for senior citizens.', eligibility: ['age 60+', 'BPL card', 'Maharashtra domicile'], documents: ['age proof', 'BPL card', 'Aadhaar', 'bank account'], marathi_name: 'इंदिरा गांधी राष्ट्रीय वृद्धापकाळ निवृत्तीवेतन योजना' },
  { id: 4, name: 'Swachh Bharat Toilet Grant', keywords: ['toilet', 'shauchalay', 'swachh'], description: 'Grant for construction of individual household latrine.', eligibility: ['BPL family', 'no existing toilet'], documents: ['BPL card', 'Aadhaar', 'bank account', 'land ownership proof'], marathi_name: 'स्वच्छ भारत शौचालय अनुदान' },
  { id: 5, name: 'Aadhaar Ration Card', keywords: ['aadhaar', 'ration', 'card', 'link', 'food'], description: 'Link Aadhaar to Ration Card for food grains.', eligibility: ['all citizens'], documents: ['existing Aadhaar', 'family photo', 'address proof'], marathi_name: 'आधार रेशन कार्ड लिंक' }
];

export const complaintsKeywords = {
  garbage: ['garbage', 'kachara', 'trash', 'bin'],
  road: ['road', 'pothole', 'gutter', 'rasta'],
  water: ['water', 'pani', 'supply', 'leak'],
  light: ['light', 'streetlight', 'dark', 'diva'],
  drain: ['drain', 'sewage', 'drainage', 'nali']
};
