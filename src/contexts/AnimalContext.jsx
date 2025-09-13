import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AnimalContext = createContext();

export const useAnimals = () => {
  const context = useContext(AnimalContext);
  if (!context) {
    throw new Error('useAnimals must be used within an AnimalProvider');
  }
  return context;
};

export const AnimalProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load animals from localStorage on app start
    const savedAnimals = localStorage.getItem('cattleApp_animals');
    if (savedAnimals) {
      setAnimals(JSON.parse(savedAnimals));
    } else {
      // Add diverse sample data with different breeds
      const sampleAnimals = [
        {
          id: '1',
          animalId: 'CT001',
          breed: 'Holstein Friesian',
          color: 'Black and White',
          horns: 'No',
          milkType: 'High Yield',
          age: '3 years',
          owner: 'Farmer 1234',
          milkYield: 25,
          lastUpdated: new Date().toISOString(),
          image: '/api/placeholder/200/200',
          traits: {
            weight: '450 kg',
            height: '140 cm',
            vaccination: 'Up to date',
            insurance: 'Active'
          },
          breeding: {
            optimalMatingTime: '12-18 months',
            recommendedPartner: 'Holstein Friesian Bull',
            breedingShelfLife: '8-10 years',
            lastMatingDate: '2023-06-15',
            nextMatingDue: '2024-03-15',
            pregnancyStatus: 'Not Pregnant',
            gestationPeriod: '280 days',
            breedingAge: '18 months',
            fertilityStatus: 'High',
            breedingHistory: [
              { date: '2023-06-15', partner: 'HF Bull 001', status: 'Successful' },
              { date: '2022-08-20', partner: 'HF Bull 002', status: 'Successful' }
            ]
          },
          health: {
            status: 'Normal',
            diseaseType: null,
            symptoms: [],
            diagnosis: 'Healthy',
            treatment: 'None required',
            preventiveMeasures: [
              'Regular vaccination',
              'Clean water supply',
              'Balanced nutrition',
              'Regular health checkups'
            ],
            vaccinationSchedule: [
              { vaccine: 'FMD', date: '2024-01-15', nextDue: '2024-07-15' },
              { vaccine: 'Brucellosis', date: '2023-12-01', nextDue: '2024-12-01' }
            ],
            medicationHistory: [],
            healthAlerts: [],
            veterinaryContact: 'Dr. Rajesh Kumar - +91 9876543210',
            quarantineStatus: 'Not Required'
          }
        },
        {
          id: '2',
          animalId: 'BF002',
          breed: 'Murrah Buffalo',
          color: 'Black',
          horns: 'Yes',
          milkType: 'High Fat',
          age: '4 years',
          owner: 'Farmer 1234',
          milkYield: 18,
          lastUpdated: new Date().toISOString(),
          image: '/api/placeholder/200/200',
          traits: {
            weight: '550 kg',
            height: '135 cm',
            vaccination: 'Due in 2 months',
            insurance: 'Active'
          },
          breeding: {
            optimalMatingTime: '15-20 months',
            recommendedPartner: 'Murrah Buffalo Bull',
            breedingShelfLife: '10-12 years',
            lastMatingDate: '2023-09-10',
            nextMatingDue: '2024-06-10',
            pregnancyStatus: 'Pregnant (5 months)',
            gestationPeriod: '310 days',
            breedingAge: '20 months',
            fertilityStatus: 'High',
            breedingHistory: [
              { date: '2023-09-10', partner: 'MB Bull 001', status: 'Successful' },
              { date: '2022-11-15', partner: 'MB Bull 002', status: 'Successful' }
            ]
          },
          health: {
            status: 'Normal',
            diseaseType: null,
            symptoms: [],
            diagnosis: 'Healthy - Pregnant',
            treatment: 'Prenatal care',
            preventiveMeasures: [
              'Extra nutrition for pregnancy',
              'Regular veterinary checkups',
              'Clean and comfortable shelter',
              'Avoid stress and overexertion'
            ],
            vaccinationSchedule: [
              { vaccine: 'FMD', date: '2023-11-01', nextDue: '2024-05-01' },
              { vaccine: 'Anthrax', date: '2023-10-15', nextDue: '2024-10-15' }
            ],
            medicationHistory: [
              { date: '2024-01-10', medication: 'Calcium supplement', reason: 'Pregnancy care' }
            ],
            healthAlerts: [
              { type: 'warning', message: 'Vaccination due in 2 months', date: '2024-03-01' }
            ],
            veterinaryContact: 'Dr. Priya Sharma - +91 9876543211',
            quarantineStatus: 'Not Required'
          }
        },
        {
          id: '3',
          animalId: 'JR003',
          breed: 'Jersey',
          color: 'Light Brown',
          horns: 'No',
          milkType: 'High Butterfat',
          age: '3 years',
          owner: 'Farmer 1234',
          milkYield: 20,
          lastUpdated: new Date().toISOString(),
          image: '/api/placeholder/200/200',
          traits: {
            weight: '350 kg',
            height: '120 cm',
            vaccination: 'Up to date',
            insurance: 'Active'
          },
          breeding: {
            optimalMatingTime: '12-15 months',
            recommendedPartner: 'Jersey Bull',
            breedingShelfLife: '8-10 years',
            lastMatingDate: '2023-08-20',
            nextMatingDue: '2024-05-20',
            pregnancyStatus: 'Not Pregnant',
            gestationPeriod: '280 days',
            breedingAge: '15 months',
            fertilityStatus: 'High',
            breedingHistory: [
              { date: '2023-08-20', partner: 'JR Bull 001', status: 'Successful' },
              { date: '2022-10-15', partner: 'JR Bull 002', status: 'Successful' }
            ]
          },
          health: {
            status: 'Normal',
            diseaseType: null,
            symptoms: [],
            diagnosis: 'Healthy',
            treatment: 'None required',
            preventiveMeasures: [
              'Regular vaccination',
              'Clean water supply',
              'High-quality feed',
              'Regular health checkups',
              'Protection from cold weather'
            ],
            vaccinationSchedule: [
              { vaccine: 'FMD', date: '2024-01-10', nextDue: '2024-07-10' },
              { vaccine: 'Brucellosis', date: '2023-11-15', nextDue: '2024-11-15' }
            ],
            medicationHistory: [],
            healthAlerts: [],
            veterinaryContact: 'Dr. Amit Singh - +91 9876543212',
            quarantineStatus: 'Not Required'
          }
        },
        {
          id: '4',
          animalId: 'SW004',
          breed: 'Sahiwal',
          color: 'Reddish Brown',
          horns: 'Small',
          milkType: 'Medium Yield',
          age: '4 years',
          owner: 'Farmer 1234',
          milkYield: 15,
          lastUpdated: new Date().toISOString(),
          image: '/api/placeholder/200/200',
          traits: {
            weight: '400 kg',
            height: '130 cm',
            vaccination: 'Up to date',
            insurance: 'Active'
          },
          breeding: {
            optimalMatingTime: '15-18 months',
            recommendedPartner: 'Sahiwal Bull',
            breedingShelfLife: '10-12 years',
            lastMatingDate: '2023-07-25',
            nextMatingDue: '2024-04-25',
            pregnancyStatus: 'Not Pregnant',
            gestationPeriod: '285 days',
            breedingAge: '18 months',
            fertilityStatus: 'High',
            breedingHistory: [
              { date: '2023-07-25', partner: 'SW Bull 001', status: 'Successful' },
              { date: '2022-09-10', partner: 'SW Bull 002', status: 'Successful' }
            ]
          },
          health: {
            status: 'Normal',
            diseaseType: null,
            symptoms: [],
            diagnosis: 'Healthy',
            treatment: 'None required',
            preventiveMeasures: [
              'Regular vaccination',
              'Clean water supply',
              'Heat-resistant shelter',
              'Regular health checkups',
              'Drought-resistant feeding'
            ],
            vaccinationSchedule: [
              { vaccine: 'FMD', date: '2023-12-20', nextDue: '2024-06-20' },
              { vaccine: 'Anthrax', date: '2023-11-30', nextDue: '2024-11-30' }
            ],
            medicationHistory: [],
            healthAlerts: [],
            veterinaryContact: 'Dr. Sunita Reddy - +91 9876543213',
            quarantineStatus: 'Not Required'
          }
        },
        {
          id: '5',
          animalId: 'GR005',
          breed: 'Gir',
          color: 'White with Red Spots',
          horns: 'Curved',
          milkType: 'High Yield',
          age: '3 years',
          owner: 'Farmer 1234',
          milkYield: 22,
          lastUpdated: new Date().toISOString(),
          image: '/api/placeholder/200/200',
          traits: {
            weight: '425 kg',
            height: '135 cm',
            vaccination: 'Due in 1 month',
            insurance: 'Active'
          },
          breeding: {
            optimalMatingTime: '15-20 months',
            recommendedPartner: 'Gir Bull',
            breedingShelfLife: '10-12 years',
            lastMatingDate: '2023-05-30',
            nextMatingDue: '2024-02-28',
            pregnancyStatus: 'Not Pregnant',
            gestationPeriod: '285 days',
            breedingAge: '18 months',
            fertilityStatus: 'High',
            breedingHistory: [
              { date: '2023-05-30', partner: 'GR Bull 001', status: 'Successful' },
              { date: '2022-07-15', partner: 'GR Bull 002', status: 'Successful' }
            ]
          },
          health: {
            status: 'Normal',
            diseaseType: null,
            symptoms: [],
            diagnosis: 'Healthy',
            treatment: 'None required',
            preventiveMeasures: [
              'Regular vaccination',
              'Clean water supply',
              'Balanced nutrition',
              'Regular health checkups',
              'Proper grooming'
            ],
            vaccinationSchedule: [
              { vaccine: 'FMD', date: '2023-12-01', nextDue: '2024-06-01' },
              { vaccine: 'Brucellosis', date: '2023-10-20', nextDue: '2024-10-20' }
            ],
            medicationHistory: [],
            healthAlerts: [
              { type: 'info', message: 'Vaccination due in 1 month', date: '2024-02-01' }
            ],
            veterinaryContact: 'Dr. Vikram Patel - +91 9876543214',
            quarantineStatus: 'Not Required'
          }
        }
      ];
      setAnimals(sampleAnimals);
      localStorage.setItem('cattleApp_animals', JSON.stringify(sampleAnimals));
    }
  }, []);

  const addAnimal = (animalData) => {
    const newAnimal = {
      id: Date.now().toString(),
      animalId: `CT${String(animals.length + 1).padStart(3, '0')}`,
      ...animalData,
      lastUpdated: new Date().toISOString()
    };
    
    const updatedAnimals = [...animals, newAnimal];
    setAnimals(updatedAnimals);
    localStorage.setItem('cattleApp_animals', JSON.stringify(updatedAnimals));
    toast.success('Animal added successfully!');
    return newAnimal;
  };

  const updateAnimal = (id, updates) => {
    const updatedAnimals = animals.map(animal => 
      animal.id === id 
        ? { ...animal, ...updates, lastUpdated: new Date().toISOString() }
        : animal
    );
    setAnimals(updatedAnimals);
    localStorage.setItem('cattleApp_animals', JSON.stringify(updatedAnimals));
    toast.success('Animal updated successfully!');
  };

  const deleteAnimal = (id) => {
    const updatedAnimals = animals.filter(animal => animal.id !== id);
    setAnimals(updatedAnimals);
    localStorage.setItem('cattleApp_animals', JSON.stringify(updatedAnimals));
    toast.success('Animal deleted successfully!');
  };

  const getAnimalById = (id) => {
    return animals.find(animal => animal.id === id);
  };

  const searchAnimals = (query) => {
    if (!query) return animals;
    
    const lowercaseQuery = query.toLowerCase();
    return animals.filter(animal => 
      animal.breed.toLowerCase().includes(lowercaseQuery) ||
      animal.animalId.toLowerCase().includes(lowercaseQuery) ||
      animal.color.toLowerCase().includes(lowercaseQuery) ||
      animal.owner.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterAnimals = (filter) => {
    if (filter === 'all') return animals;
    if (filter === 'cattle') return animals.filter(animal => animal.breed.toLowerCase().includes('holstein') || animal.breed.toLowerCase().includes('jersey'));
    if (filter === 'buffalo') return animals.filter(animal => animal.breed.toLowerCase().includes('buffalo') || animal.breed.toLowerCase().includes('murrah'));
    return animals;
  };

  const getMilkYieldStats = () => {
    const totalYield = animals.reduce((sum, animal) => sum + (animal.milkYield || 0), 0);
    const averageYield = animals.length > 0 ? totalYield / animals.length : 0;
    
    return {
      totalAnimals: animals.length,
      totalYield,
      averageYield: Math.round(averageYield * 10) / 10
    };
  };

  const value = {
    animals,
    loading,
    addAnimal,
    updateAnimal,
    deleteAnimal,
    getAnimalById,
    searchAnimals,
    filterAnimals,
    getMilkYieldStats
  };

  return (
    <AnimalContext.Provider value={value}>
      {children}
    </AnimalContext.Provider>
  );
};
