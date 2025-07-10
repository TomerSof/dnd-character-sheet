import FeaturesTable from './featuresTable';

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