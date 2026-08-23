import React, { useState, useEffect } from 'react';
import { Activity, Dumbbell, History } from 'lucide-react';
import { workoutPlan } from './data/workouts';
import WorkoutView from './components/WorkoutView';
import HistoryView from './components/HistoryView';

const WORKOUT_ORDER = ['A', 'B', 'C', 'D', 'E'];

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [nextWorkoutId, setNextWorkoutId] = useState('A');
  const [weeklyCount, setWeeklyCount] = useState(0);

  useEffect(() => {
    const savedHistory = localStorage.getItem('workoutHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      
      if (history.length > 0) {
        // Lógica 1: Descobrir o próximo treino
        const lastWorkout = history[history.length - 1].workoutId;
        const lastIndex = WORKOUT_ORDER.indexOf(lastWorkout);
        const nextIndex = (lastIndex + 1) % WORKOUT_ORDER.length;
        setNextWorkoutId(WORKOUT_ORDER[nextIndex]);

        // Lógica 2: Calcular treinos nos últimos 7 dias
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        
        const recentWorkouts = history.filter(session => {
          const sessionDate = new Date(session.date);
          return sessionDate >= sevenDaysAgo;
        });
        
        setWeeklyCount(recentWorkouts.length);
      }
    }
  }, [currentScreen]); 

  if (currentScreen === 'workout') {
    return (
      <WorkoutView 
        workoutId={nextWorkoutId} 
        onBack={() => setCurrentScreen('home')} 
      />
    );
  }

  if (currentScreen === 'history') {
    return <HistoryView onBack={() => setCurrentScreen('home')} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans pb-20">
      <header className="bg-gray-800 p-4 shadow-md sticky top-0 z-10">
        <h1 className="text-xl font-bold flex items-center gap-2 text-blue-400">
          <Dumbbell className="w-6 h-6" />
          Meu Treino
        </h1>
      </header>

      <main className="p-4 max-w-md mx-auto">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h2>
          <p className="text-gray-400 text-sm mb-4">Pronto para focar na hipertrofia hoje?</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              {/* O peso ainda está fixo, no futuro podemos criar uma tela para atualizá-lo */}
              <span className="block text-3xl font-bold text-blue-400">92</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Peso Atual (kg)</span>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              {/* Agora o número de treinos é dinâmico! */}
              <span className="block text-3xl font-bold text-green-400">{weeklyCount}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Treinos (7 dias)</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setCurrentScreen('workout')}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl flex justify-center items-center gap-2 transition-colors shadow-lg"
        >
          <Activity className="w-5 h-5" />
          Iniciar Treino: {workoutPlan[nextWorkoutId].title}
        </button>
      </main>

<nav className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700 p-3">
        <div className="flex justify-around max-w-md mx-auto">
          <button 
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center p-2 ${currentScreen === 'home' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <Activity className="w-6 h-6 mb-1" />
            <span className="text-xs">Treino</span>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('history')}
            className={`flex flex-col items-center p-2 ${currentScreen === 'history' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <History className="w-6 h-6 mb-1" />
            <span className="text-xs">Histórico</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;