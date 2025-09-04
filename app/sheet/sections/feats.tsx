import FeaturesTable from '../../components/FeaturesTable';

export default function Feats() {
  return (
    <FeaturesTable
      title="Feats"
      nameLabel="Feat Name"
      descLabel="Description"
      namePlaceholder="Enter Feat Name"
      descPlaceholder="Describe The Feat"
    />
  );
}