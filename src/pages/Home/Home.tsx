import { useNavigate } from "react-router-dom";
import { ArrowRight, Wallet } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-12 text-center pt-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            seok.dev
          </h1>
          <p className="text-lg text-gray-600">다양한 도구를 한곳에서</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Card */}
          <button
            onClick={() => navigate("/budget")}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-left border-2 border-transparent hover:border-emerald-500"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Wallet className="text-white" size={32} />
              </div>
              <ArrowRight
                className="text-emerald-500 group-hover:translate-x-2 transition-transform"
                size={24}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              💚 나의 가계부
            </h2>
            <p className="text-gray-600">똑똑한 소비 습관을 만들어보세요</p>
          </button>

          {/* Placeholder for future features */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg opacity-50 cursor-not-allowed border-2 border-dashed border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔜</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-400 mb-2">
              Coming Soon
            </h2>
            <p className="text-gray-400">새로운 기능을 준비 중입니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
