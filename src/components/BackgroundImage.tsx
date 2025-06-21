
const BackgroundImage = () => {
  return (
    <div className="fixed inset-0 z-0">
      <img
        src="https://i.postimg.cc/qgfpzrmm/projectimage.jpg"
        alt="Scientific background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-indigo-900/70"></div>
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default BackgroundImage;
