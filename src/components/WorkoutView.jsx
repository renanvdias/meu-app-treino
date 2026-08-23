import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Timer, RotateCcw } from 'lucide-react';
import { workoutPlan } from '../data/workouts';

export default function WorkoutView({ workoutId, onBack }) {
  // Agora ele carrega o treino dinamicamente baseado na prop workoutId
  const currentWorkout = workoutPlan[workoutId]; 
  const [exercises, setExercises] = useState(currentWorkout.exercises);
  
  const [timeLeft, setTimeLeft] = useState(90); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
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

  // Função para salvar o treino e voltar
  const finishWorkout = () => {
    const savedHistory = localStorage.getItem('workoutHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    
    // Adiciona o treino atual ao histórico com a data de hoje
    history.push({
      date: new Date().toISOString(),
      workoutId: workoutId,
      // No futuro, podemos salvar os 'exercises' aqui para guardar as cargas que você usou
    });

    localStorage.setItem('workoutHistory', JSON.stringify(history));
    
    // Volta para a tela inicial
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans pb-24">
      <header className="bg-gray-800 p-4 shadow-md sticky top-0 z-10 flex items-center gap-3 border-b border-gray-700">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-blue-400">{currentWorkout.title}</h1>
          <p className="text-xs text-gray-400">Proteja a lombar. Foco na execução.</p>
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-4">
        {exercises.map((ex) => (
          <div 
            key={ex.id} 
            className={`rounded-xl p-4 transition-all border ${
              ex.done 
                ? 'bg-gray-800/50 border-gray-700 opacity-60' 
                : 'bg-gray-800 border-gray-600 shadow-md'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className={`font-bold text-lg ${ex.done ? 'text-gray-400 line-through' : 'text-gray-100'}`}>
                  {ex.name}
                </h3>
                <p className="text-xs text-yellow-500/80 mt-1">{ex.notes}</p>
              </div>
              <button 
                onClick={() => toggleDone(ex.id)}
                className={`p-3 rounded-full flex-shrink-0 transition-colors ${
                  ex.done ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                <Check className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 items-center">
              <div className="text-center">
                <span className="block text-xs text-gray-400 mb-1">Séries</span>
                <span className="font-bold text-lg">{ex.sets}x</span>
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 mb-1 text-center uppercase">Reps</label>
                <input 
                  type="text" 
                  defaultValue={ex.reps}
                  disabled={ex.done}
                  className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-center text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 mb-1 text-center uppercase">Carga (kg)</label>
                <input 
                  type="number" 
                  placeholder="0"
                  disabled={ex.done}
                  className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-center text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        ))}
      </main>

      <div className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          
          <div 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isTimerRunning ? 'bg-blue-900/30' : 'bg-transparent'
            }`}
          >
            <Timer className={`w-6 h-6 ${isTimerRunning ? 'text-blue-400 animate-pulse' : 'text-gray-500'}`} />
            <span className={`font-mono text-2xl font-bold ${isTimerRunning ? 'text-blue-400' : 'text-gray-500'}`}>
              {formatTime(timeLeft)}
            </span>
            {isTimerRunning && (
               <button onClick={startTimer} className="ml-2 text-gray-400 hover:text-white" title="Reiniciar Timer">
                 <RotateCcw className="w-4 h-4" />
               </button>
            )}
          </div>

          {/* O botão agora chama a função finishWorkout */}
          <button 
            onClick={finishWorkout}
            className="bg-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm font-bold hover:bg-red-500/30 active:bg-red-500/40 transition-colors"
          >
            Finalizar Treino
          </button>
        </div>
      </div>
    </div>
  );
}