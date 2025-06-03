import { Medicine, MedicinesByLetter } from './medicineTypes';
import { medicines } from './medicinesData';

export const getMedicinesByLetter = (): MedicinesByLetter => {
  const medicinesByLetter: MedicinesByLetter = {};
  
  medicines.forEach(medicine => {
    const firstLetter = medicine.name.charAt(0).toUpperCase();
    if (!medicinesByLetter[firstLetter]) {
      medicinesByLetter[firstLetter] = [];
    }
    medicinesByLetter[firstLetter].push(medicine);
  });
  
  return medicinesByLetter;
};

export const searchMedicines = (query: string): Medicine[] => {
  return medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(query.toLowerCase()) ||
    medicine.description.toLowerCase().includes(query.toLowerCase())
  );
};
