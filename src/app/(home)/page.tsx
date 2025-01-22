export default async function Home() {
  return (
    <div className="flex w-full flex-col">
      <div className="font-luckiest  h-[90vh] text-[80px] bg-[url('../assets/background.png')] bg-cover bg-center bg-[#f4dac9]">
        <h1 className="font-luckiest text-dark_brown text-center"></h1>
      </div>
      <div className="h-[100vh] bg-[#f4dac9]">
        section about the whole concept of app
      </div>
      <div className="h-[100vh] bg-[#f4dac9]">
        section about how it works - generate, compoese
      </div>
      <div className="h-[100vh] bg-[#f4dac9]">
        section about sharing with other people
      </div>
    </div>
  );
}
