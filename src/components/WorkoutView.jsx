import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Timer, RotateCcw, Loader2 } from 'lucide-react';
import { workoutPlan } from '../data/workouts';
import { supabase } from '../supabaseClient';

export default function WorkoutView({ workoutId, onBack }) {
  const currentWorkout = workoutPlan[workoutId]; 
  const [exercises, setExercises] = useState(currentWorkout.exercises);
  const [timeLeft, setTimeLeft] = useState(90); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((time) => time - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setTimeLeft(90); 
    setIsTimerRunning(true);
  };

  const toggleDone = (id) => {
    setExercises(exercises.map(ex => {
      if (ex.id === id) {
        const isNowDone = !ex.done;
        if (isNowDone) startTimer();
        return { ...ex, done: isNowDone };
      }
      return ex;
    }));
  };

  const finishWorkout = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('workout_history')
        .insert([{ workout_id: workoutId }]);
        
      if (error) throw error;
      onBack(); // Volta para a tela inicial
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      alert('Erro ao salvar. Verifique sua conexão com a internet.');
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-28">
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10 flex items-center gap-3 border-b border-slate-100">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">{currentWorkout.title}</h1>
          <p className="text-[11px] text-slate-500 font-medium">Proteja a lombar. Foco na execução.</p>
        </div>
      </header>

      <main className="p-5 max-w-md mx-auto space-y-4">
        {exercises.map((ex) => (
          <div 
            key={ex.id} 
            className={`rounded-3xl p-5 transition-all duration-300 border ${
              ex.done 
                ? 'bg-slate-100/50 border-slate-200 opacity-70 scale-[0.98]' 
                : 'bg-white border-slate-100 shadow-sm'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="pr-4">
                <h3 className={`font-bold text-lg leading-tight ${ex.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {ex.name}
                </h3>
                <p className="text-xs text-amber-600/90 font-medium mt-1">{ex.notes}</p>
              </div>
              <button 
                onClick={() => toggleDone(ex.id)}
                className={`p-4 rounded-full flex-shrink-0 transition-all ${
                  ex.done ? 'bg-emerald-100 text-emerald-600 shadow-inner' : 'bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <Check className="w-6 h-6 stroke-[3px]" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Séries</span>
                <span className="font-black text-xl text-slate-700">{ex.sets}x</span>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">Reps</label>
                <input 
                  type="text" 
                  defaultValue={ex.reps}
                  disabled={ex.done}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-center text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none disabled:bg-transparent disabled:border-transparent"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">Carga</label>
                <input 
                  type="number" 
                  placeholder="0"
                  disabled={ex.done}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-center text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none disabled:bg-transparent disabled:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Timer Bar Clean */}
      <div className="fixed bottom-0 w-full bg-white border-t border-slate-100 p-4 pb-safe shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
              isTimerRunning ? 'bg-indigo-50 border border-indigo-100' : 'bg-slate-50 border border-slate-100'
            }`}
          >
            <Timer className={`w-6 h-6 ${isTimerRunning ? 'text-indigo-600 animate-pulse' : 'text-slate-400'}`} />
            <span className={`font-mono text-2xl font-black ${isTimerRunning ? 'text-indigo-600' : 'text-slate-400'}`}>
              {formatTime(timeLeft)}
            </span>
            {isTimerRunning && (
               <button onClick={startTimer} className="ml-2 text-indigo-400 hover:text-indigo-700 bg-white p-1 rounded-full shadow-sm">
                 <RotateCcw className="w-4 h-4" />
               </button>
            )}
          </div>

          <button 
            onClick={finishWorkout}
            disabled={isSaving}
            className="bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl text-sm font-black tracking-wide hover:bg-rose-100 active:scale-95 transition-all disabled:opacity-70 flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'FINALIZAR'}
          </button>
        </div>
      </div>
    </div>
  );
}