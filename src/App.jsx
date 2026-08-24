import React, { useState, useEffect } from 'react';
import { Activity, Dumbbell, History, Loader2 } from 'lucide-react';
import { workoutPlan } from './data/workouts';
import WorkoutView from './components/WorkoutView';
import HistoryView from './components/HistoryView';
import { supabase } from './supabaseClient';

const WORKOUT_ORDER = ['A', 'B', 'C', 'D', 'E'];

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [nextWorkoutId, setNextWorkoutId] = useState('A');
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const { data: history, error } = await supabase
        .from('workout_history')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (history && history.length > 0) {
        // Lógica de próximo treino
        const lastWorkout = history[history.length - 1].workout_id;
        const lastIndex = WORKOUT_ORDER.indexOf(lastWorkout);
        const nextIndex = (lastIndex + 1) % WORKOUT_ORDER.length;
        setNextWorkoutId(WORKOUT_ORDER[nextIndex]);

        // Treinos nos últimos 7 dias
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        const recentWorkouts = history.filter(session => new Date(session.created_at) >= sevenDaysAgo);
        setWeeklyCount(recentWorkouts.length);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Busca os dados toda vez que a tela Home é renderizada
  useEffect(() => {
    if (currentScreen === 'home') {
      fetchDashboardData();
    }
  }, [currentScreen]);

  if (currentScreen === 'workout') return <WorkoutView workoutId={nextWorkoutId} onBack={() => setCurrentScreen('home')} />;
  if (currentScreen === 'history') return <HistoryView onBack={() => setCurrentScreen('home')} />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      <header className="bg-white px-6 py-5 shadow-sm sticky top-0 z-10 border-b border-slate-100">
        <h1 className="text-2xl font-black flex items-center gap-2 text-indigo-600 tracking-tight">
          <Dumbbell className="w-7 h-7" />
          Meu Treino
        </h1>
      </header>

      <main className="p-5 max-w-md mx-auto space-y-6">
        <div className="bg-white rounded-[2rem] p-7 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold mb-1 text-slate-900">Bem-vindo de volta!</h2>
          <p className="text-slate-500 text-sm mb-6">Pronto para focar na hipertrofia hoje?</p>
          
          <div className="grid grid-cols-2 gap-4 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
              </div>
            )}
            <div className="bg-slate-50 p-5 rounded-3xl text-center border border-slate-100">
              <span className="block text-4xl font-black text-indigo-600">92</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 block">Peso (kg)</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-3xl text-center border border-slate-100">
              <span className="block text-4xl font-black text-emerald-500">{weeklyCount}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 block">Na Semana</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setCurrentScreen('workout')}
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 text-white font-bold py-5 px-6 rounded-2xl flex justify-center items-center gap-3 transition-all shadow-md shadow-indigo-200"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <Activity className="w-6 h-6" />
              <span className="text-lg">Iniciar: {workoutPlan[nextWorkoutId].title.split(' (')[0]}</span>
            </>
          )}
        </button>
      </main>

      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100 pb-safe pt-2 px-2 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around max-w-md mx-auto pb-2">
          <button 
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${currentScreen === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Activity className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">Treino</span>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('history')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${currentScreen === 'history' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <History className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">Histórico</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;