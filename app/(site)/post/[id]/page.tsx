interface props {
  params: {
    id: string;
  };
}

export default function page({ params }: props) {
  return <div>post {params.id}</div>;
}
