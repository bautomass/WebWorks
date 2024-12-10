import Script from "next/script";

const MobileAppDevelopment: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            // ... keep existing schema ...
          }),
        }}
      />
    </div>
  );
};

export default MobileAppDevelopment; 