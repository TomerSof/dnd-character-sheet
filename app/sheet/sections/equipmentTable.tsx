import FeaturesTable from './featuresTable';

export default function EquipmentTable() {
  return (
    <FeaturesTable
      title="Equipment"
      nameLabel="Name"
      descLabel="Description"
      namePlaceholder="Enter Equipment Name"
      descPlaceholder="Describe The Equipment"
    />
  );
}