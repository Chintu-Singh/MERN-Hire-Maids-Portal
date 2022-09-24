import Profile from "../components/Profile.jsx";

const App = ({ profileDets }) => {
  return <Profile profileType={profileDets.profileType} />;
};

export default App;
