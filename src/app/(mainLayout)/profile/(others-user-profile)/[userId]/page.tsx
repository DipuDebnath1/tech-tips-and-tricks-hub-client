const MyProfile = ({ params }: { params: { userId: string } }) => {
  return <div>{params.userId}</div>;
};

export default MyProfile;
