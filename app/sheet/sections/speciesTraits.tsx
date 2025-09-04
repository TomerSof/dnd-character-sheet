import FeaturesTable from '../../components/FeaturesTable';

export default function SpeciesTraits() {
  return (
    <FeaturesTable
      title="Species Traits"
      nameLabel="Trait Name"
      descLabel="Description"
      namePlaceholder="Enter Trait Name"
      descPlaceholder="Describe The Trait"
    />
  );
}