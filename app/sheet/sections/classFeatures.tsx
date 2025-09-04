import FeaturesTable from '../../components/FeaturesTable';

export default function ClassFeatures() {
  return (
    <FeaturesTable
      title="Class Features"
      nameLabel="Feature Name"
      descLabel="Description"
      namePlaceholder="Enter Feature Name"
      descPlaceholder="Describe The Feature"
    />
  );
}