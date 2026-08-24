import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Dumbbell, Loader2 } from 'lucide-react';
import { workoutPlan } from '../data/workouts';
import { supabase } from '../supabaseClient';

export default function HistoryView({ onBack }) {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // O Supabase já traz ordenado perfeitamente com a query abaixo
        const { data, error } = await supabase
          .from('workout_history')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistory(data || []);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10 flex items-center gap-3 border-b border-slate-100">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">Histórico</h1>
          <p className="text-[11px] text-slate-500 font-medium">Sua consistência na nuvem</p>
        </div>
      </header>

      <main className="p-5 max-w-md mx-auto space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-600 font-bold">Nenhum treino registrado.</p>
            <p className="text-sm text-slate-400 mt-1">O Supabase está vazio, vá treinar!</p>
          </div>
        ) : (
          history.map((session) => {
            const workoutDetails = workoutPlan[session.workout_id];
            
            return (
              <div key={session.id} className="bg-white border border-slate-100 rounded-3xl p-5 flex items-center gap-4 shadow-sm">
                <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600 flex-shrink-0">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">
                    Treino {session.workout_id} - {workoutDetails?.title.split(' (')[0]}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1 capitalize">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(session.created_at)}
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