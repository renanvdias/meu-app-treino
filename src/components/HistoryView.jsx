import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Dumbbell } from 'lucide-react';
import { workoutPlan } from '../data/workouts';

export default function HistoryView({ onBack }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Busca os dados do banco local
    const savedHistory = localStorage.getItem('workoutHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      // Ordena do mais recente para o mais antigo (descendente)
      const sortedHistory = parsedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
      setHistory(sortedHistory);
    }
  }, []);

  // Função para formatar a data para o padrão brasileiro
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans pb-24">
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-md sticky top-0 z-10 flex items-center gap-3 border-b border-gray-700">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-blue-400">Histórico de Treinos</h1>
          <p className="text-xs text-gray-400">Sua consistência registrada</p>
        </div>
      </header>

      {/* Lista de Histórico */}
      <main className="p-4 max-w-md mx-auto space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-10">
            <Calendar className="w-12 h-12 mx-auto text-gray-600 mb-3" />
            <p className="text-gray-400">Nenhum treino registrado ainda.</p>
            <p className="text-sm text-gray-500 mt-1">Vá puxar um ferro!</p>
          </div>
        ) : (
          history.map((session, index) => {
            const workoutDetails = workoutPlan[session.workoutId];
            
            return (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                <div className="bg-gray-700 p-3 rounded-full text-blue-400 flex-shrink-0">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-100">
                    Treino {session.workoutId} - {workoutDetails?.title.split(' (')[0]}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1 capitalize">
                    <Calendar className="w-3 h-3" />
                    {formatDate(session.date)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}