interface PageParams {
  params: {
    id: string;
  };
}

const TripEntry = ({ params }: PageParams) => {
  return <div> Trip Entry {params.id}</div>;
}

export default TripEntry;