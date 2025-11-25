import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface Categories {
  [key: string]: string[];
  income: string[];
  expense: string[];
}

const Budget = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "income",
      amount: 3000000,
      category: "💼 급여",
      description: "월급",
      date: "2025-11-15",
    },
    {
      id: 2,
      type: "expense",
      amount: 850000,
      category: "🏠 주거",
      description: "월세",
      date: "2025-11-14",
    },
    {
      id: 3,
      type: "expense",
      amount: 45000,
      category: "🍔 식비",
      description: "외식",
      date: "2025-11-13",
    },
    {
      id: 4,
      type: "income",
      amount: 200000,
      category: "💰 부수입",
      description: "프리랜서",
      date: "2025-11-12",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "🍔 식비",
    description: "",
  });

  const categories: Categories = {
    income: ["💼 급여", "💰 부수입", "🎁 상여금", "📈 투자"],
    expense: [
      "🍔 식비",
      "🏠 주거",
      "🚗 교통",
      "🛒 쇼핑",
      "💊 의료",
      "📚 교육",
      "🎮 여가",
    ],
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const filteredTransactions = transactions
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSubmit = () => {
    if (!formData.amount || !formData.description) return;

    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: parseInt(formData.amount),
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTransaction, ...transactions]);
    setShowModal(false);
    setFormData({
      type: "expense",
      amount: "",
      category: "🍔 식비",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            💚 나의 가계부
          </h1>
          <p className="text-gray-600">똑똑한 소비 습관을 만들어요</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">총 잔액</span>
              <Wallet className="text-emerald-500" size={24} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">
              {balance.toLocaleString()}원
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-50 text-sm font-medium">수입</span>
              <TrendingUp className="text-white" size={24} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">
              +{totalIncome.toLocaleString()}원
            </p>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-rose-50 text-sm font-medium">지출</span>
              <TrendingDown className="text-white" size={24} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">
              -{totalExpense.toLocaleString()}원
            </p>
          </div>
        </div>

        {/* Filter Tabs & Add Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 bg-white rounded-xl p-1 shadow-md">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "all"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter("income")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "income"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              수입
            </button>
            <button
              onClick={() => setFilter("expense")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "expense"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              지출
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            추가
          </button>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-bold text-gray-800">거래 내역</h2>
          </div>
          <div className="divide-y">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        transaction.type === "income"
                          ? "bg-emerald-100"
                          : "bg-rose-100"
                      }`}
                    >
                      {transaction.category.split(" ")[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category} · {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-lg font-bold ${
                      transaction.type === "income"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {transaction.amount.toLocaleString()}원
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                새 거래 추가
              </h3>

              <div className="space-y-4">
                {/* Type Toggle */}
                <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: "expense",
                        category: "🍔 식비",
                      })
                    }
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      formData.type === "expense"
                        ? "bg-rose-500 text-white shadow-md"
                        : "text-gray-600"
                    }`}
                  >
                    지출
                  </button>
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: "income",
                        category: "💼 급여",
                      })
                    }
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      formData.type === "income"
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-gray-600"
                    }`}
                  >
                    수입
                  </button>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    금액
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {categories[formData.type].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    내용
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="거래 내용을 입력하세요"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    추가하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
